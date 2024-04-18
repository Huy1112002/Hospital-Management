import { Injectable } from '@nestjs/common';
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

    async createMedicine(createMedicineDto: CreateMedicineDto) {
        const medicine = await this.cabinetRepo.findOne({
            where: { medicine_id: createMedicineDto.medicine_id },
        });

        return medicine ? { message: 'Medicine already exists' } : this.cabinetRepo.save(createMedicineDto);
    }

    async createBatch(createBatchDto: CreateBatchDto) {
        const { medicines, ...detail } = createBatchDto;

        const batchDetailEntity = this.batchDetailRepo.create(detail);

        const messages: string[] = [];
        for (const medicine of medicines) {
            const medicineEntity = await this.cabinetRepo.findOne({
                where: { medicine_id: medicine.medicine_id },
            });

            if (medicineEntity) {
                const batchMedicineEntity = this.batchMedicineRepo.create({
                    medicine_id: medicine.medicine_id,
                    quantity: medicine.quantity,
                    costIn: medicine.costIn,
                    expire: medicine.expire,
                    vendor: medicine.vendor,
                });
                const availableMedicineEntity = this.availableMedRepo.create({
                    remaining: medicine.quantity,
                });

                batchMedicineEntity.batchDetail = batchDetailEntity;
                batchMedicineEntity.availableMedicine = availableMedicineEntity;

                availableMedicineEntity.medicine = medicineEntity;

                batchDetailEntity.total_type += 1;
                medicineEntity.remaining += medicine.quantity;

                console.log(medicineEntity);
                console.log(batchMedicineEntity);
                console.log(availableMedicineEntity);

                await this.cabinetRepo.save(medicineEntity);
                await this.batchMedicineRepo.save(batchMedicineEntity);
                await this.availableMedRepo.save(availableMedicineEntity);

                messages.push(`Medicine ${medicine.medicine_id} added to batch`);
            } else {
                messages.push(`Medicine ${medicine.medicine_id} not found`);
            }
        }

        if (batchDetailEntity.total_type) {
            await this.batchDetailRepo.save(batchDetailEntity);
        }

        return { messages };
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
            return { message: 'Medicine not found' };
        }

        if (medicine.remaining < amount) {
            return { message: 'Not enough medicine' };
        }

        medicine.remaining -= amount;
        await this.cabinetRepo.save(medicine);

        medicine.availableMedicines.sort((a, b) => a.batchMedicine.expire.getTime() - b.batchMedicine.expire.getTime());

        let logs = [];
        for (let i = 0; i < medicine.availableMedicines.length; i++) {
            const availableMedicine = medicine.availableMedicines[i];

            const log = {
                medicine_id,
                export_date: new Date(),
                quantity: 0,
                costOut: medicine.costOut,
                description: '',
                batchMedicine: availableMedicine.batchMedicine,
            };

            if (amount >= availableMedicine.remaining) {
                log.quantity = availableMedicine.remaining;
                log.description =
                    amount === availableMedicine.remaining
                        ? `${availableMedicine.batchMedicine.medicine_id} not enough, need ${amount}, take ${log.quantity}`
                        : `Amount ${amount}, take all from ${availableMedicine.batchMedicine.medicine_id}`;

                amount -= availableMedicine.remaining;

                // Remains 0, remove from availableMedicines
                this.availableMedRepo.remove(availableMedicine);

                // Remove from cabinet
                medicine.availableMedicines.splice(i, 1);
                i--;
            } else {
                log.quantity = amount;
                log.description = `Amount ${amount}, take ${log.quantity} from ${availableMedicine.batchMedicine.medicine_id}`;

                availableMedicine.remaining -= amount;

                await this.batchMedicineRepo.save(availableMedicine);

                amount = 0;
            }

            logs.push(log.description);

            const medicineLogEntity = this.medicineLogRepo.create(log);
            await this.medicineLogRepo.save(medicineLogEntity);

            if (!amount) break;
        }
        return logs;
    }

    async updateCostOut(medicine_id: string, newCost: number) {
        const medicine = await this.cabinetRepo.findOne({ where: { medicine_id } });

        if (!medicine) {
            return { message: 'Medicine not found' };
        }

        medicine.costOut = newCost;
        await this.cabinetRepo.save(medicine);

        return { message: 'Cost updated' };
    }

    async getLogsById(medicine_id: string) {
        const logs = await this.medicineLogRepo.find({
            where: { medicine_id },
        });

        return logs.length ? logs : { message: `No logs found for medicine ${medicine_id}` };
    }

    async getLogsByBatchId(id: string) {
        const batch = await this.batchDetailRepo.findOne({
            where: { id },
            relations: ['batchMedicines', 'batchMedicines.medicineLogs'],
        });

        if (!batch) {
            return { message: 'Batch not found' };
        }

        const logs = batch.batchMedicines.map((batchMedicine) => {
            console.log(batchMedicine);
            this.getLogsById(batchMedicine.medicine_id);
        });

        return logs;
    }
}
