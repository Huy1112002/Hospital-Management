import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBatchDto } from './dto/create-batch.dto';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { BatchDetail } from './entities/batch_detail.entity';
import { BatchMedicine } from './entities/batch_medicine.entity';
import { Cabinet } from './entities/cabinet.entity';
import { AvailableMedicine } from './entities/available_medicine.entity';
import { MedicineLog } from './entities/medicine_log.entity';

@Injectable()
export class MedicineService {
    constructor(
        @InjectRepository(BatchDetail) private batchDetailRepo: Repository<BatchDetail>,
        @InjectRepository(BatchMedicine) private batchMedicineRepo: Repository<BatchMedicine>,
        @InjectRepository(Cabinet) private cabinetRepo: Repository<Cabinet>,
        @InjectRepository(AvailableMedicine) private availableMedRepo: Repository<AvailableMedicine>,
        @InjectRepository(MedicineLog) private medicineLogRepo: Repository<MedicineLog>,
    ) {}

    // ### Service for medicine
    async createMedicine(createMedicineDto: CreateMedicineDto) {
        const medicine = await this.cabinetRepo.findOne({ where: { medicine_id: createMedicineDto.medicine_id } });

        return medicine ? { message: 'Medicine already exists' } : this.cabinetRepo.save(createMedicineDto);
    }

    async getMedicines() {
        return await this.cabinetRepo.find();
    }

    async getMedicine(medicine_id: string) {
        const medicine = await this.cabinetRepo.findOne({
            where: { medicine_id },
            relations: ['availableMedicines'],
        });

        return medicine ? medicine : { message: 'Medicine not found' };
    }

    async useMedicine(medicine_id: string, amount: number) {
        const medicine = await this.cabinetRepo.findOne({
            where: { medicine_id },
            relations: ['availableMedicines', 'availableMedicines.batchMedicine'],
        });

        if (!medicine) {
            throw new NotFoundException('Medicine not found');
        }

        if (medicine.remaining < amount) {
            throw new ForbiddenException(`Not enough medicine ${medicine_id}`);
        }

        medicine.remaining -= amount;
        await this.cabinetRepo.save(medicine);

        medicine.availableMedicines.sort((a, b) => a.batchMedicine.expire.getTime() - b.batchMedicine.expire.getTime());

        let total_cost = 0;
        let logs = [];

        for (const availableMedicine of medicine.availableMedicines) {
            const log = {
                medicine_id,
                export_date: new Date(),
                cost_out: medicine.cost_out,
                prev_remaining: availableMedicine.remaining,
                curr_remaining: 0,
                description: '',
                batchMedicine: availableMedicine.batchMedicine,
            };

            if (amount >= availableMedicine.remaining) {
                log.curr_remaining = 0;
                log.description =
                    amount === availableMedicine.remaining
                        ? `From medicine batch ${availableMedicine.batchMedicine.id} take all (${amount}) medicine ${medicine_id}`
                        : `Medicine batch ${availableMedicine.batchMedicine.id} not enough medicine ${medicine_id}, need ${amount}, remainning ${availableMedicine.remaining}, take all`;

                total_cost += availableMedicine.remaining * medicine.cost_out;

                amount -= availableMedicine.remaining;

                // Remains 0, remove from availableMedicines
                this.availableMedRepo.remove(availableMedicine);
            } else {
                log.curr_remaining = availableMedicine.remaining - amount;
                log.description = `From medicine batch ${availableMedicine.batchMedicine.id} take ${amount} medicine ${medicine_id}`;

                total_cost += amount * medicine.cost_out;

                availableMedicine.remaining -= amount;

                await this.availableMedRepo.save(availableMedicine);

                amount = 0;
            }

            logs.push(log.description);

            const medicineLogEntity = this.medicineLogRepo.create(log);
            await this.medicineLogRepo.save(medicineLogEntity);

            if (!amount) break;
        }

        return { total_cost, logs };
    }

    async updateCostOut(medicine_id: string, newCost: number) {
        const medicine = await this.cabinetRepo.findOne({ where: { medicine_id } });

        if (!medicine) {
            return { message: 'Medicine not found' };
        }

        medicine.cost_out = newCost;
        await this.cabinetRepo.save(medicine);

        return { message: 'Cost updated' };
    }

    async getLogsById(medicine_id: string) {
        const logs = await this.medicineLogRepo.find({ where: { medicine_id }, relations: ['batchMedicine'] });

        return logs.length ? logs : { message: `No logs found for medicine ${medicine_id}` };
    }

    // ### Service for batch
    async createBatch(createBatchDto: CreateBatchDto) {
        const { medicines, ...detail } = createBatchDto;

        const batchDetailEntity = this.batchDetailRepo.create(detail);

        // Get all medicine entities from cabinet which id in medicines
        const medicineEntities = await this.cabinetRepo.findByIds(medicines.map((medicine) => medicine.medicine_id));

        const batchMedicineEntities: BatchMedicine[] = [];
        const availableMedicineEntities: AvailableMedicine[] = [];

        const messages: string[] = [];
        for (const medicine of medicines) {
            const medicineEntity = medicineEntities.find((entity) => entity.medicine_id === medicine.medicine_id);

            if (medicineEntity) {
                const batchMedicineEntity = this.batchMedicineRepo.create({
                    medicine_id: medicine.medicine_id,
                    quantity: medicine.quantity,
                    cost_in: medicine.cost_in,
                    expire: medicine.expire,
                    vendor: medicine.vendor,
                });
                const availableMedicineEntity = this.availableMedRepo.create({
                    remaining: medicine.quantity,
                });

                batchMedicineEntity.batchDetail = batchDetailEntity;

                availableMedicineEntity.medicine = medicineEntity;
                availableMedicineEntity.batchMedicine = batchMedicineEntity;

                batchDetailEntity.total_type += 1;
                medicineEntity.remaining += medicine.quantity;

                batchMedicineEntities.push(batchMedicineEntity);
                availableMedicineEntities.push(availableMedicineEntity);

                messages.push(`Medicine ${medicine.medicine_id} added to batch`);
            } else {
                messages.push(`Medicine ${medicine.medicine_id} not found`);
            }
        }

        if (batchDetailEntity.total_type) {
            await this.cabinetRepo.save(medicineEntities);
            await this.batchDetailRepo.save(batchDetailEntity);
            await this.batchMedicineRepo.save(batchMedicineEntities);
            await this.availableMedRepo.save(availableMedicineEntities);

            return { batch_id: batchDetailEntity.id, messages };
        }

        return { messages };
    }

    async getBatches() {
        return await this.batchDetailRepo.find({ relations: ['batchMedicines'] });
    }

    async getBatch(id: string) {
        const batch = await this.batchDetailRepo.findOne({
            where: { id },
            relations: ['batchMedicines'],
        });

        return batch ? batch : { message: 'Batch not found' };
    }

    async getLogsByBatchId(id: string) {
        const batch = await this.batchDetailRepo.findOne({
            where: { id },
            relations: ['batchMedicines', 'batchMedicines.medicineLogs'],
        });

        if (!batch) {
            return { message: 'Batch not found' };
        }

        const logs = [];
        batch.batchMedicines.forEach((batchMedicine) => logs.push(...batchMedicine.medicineLogs));

        return logs;
    }
}
