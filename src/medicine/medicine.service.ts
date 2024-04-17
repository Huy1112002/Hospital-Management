import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BatchDetail } from './entities/batch_detail.entity';
import { BatchMedicine } from './entities/batch_medicine.entity';
import { Cabinet } from './entities/cabinet.entity';
import { CreateBatchDto } from './dto/create-batch.dto';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { HistoryExportMedicine } from './entities/history_export_medicine.entity';

@Injectable()
export class MedicineService {
    constructor(
        @InjectRepository(BatchDetail)
        private batchDetailRepo: Repository<BatchDetail>,
        @InjectRepository(BatchMedicine)
        private batchMedicineRepo: Repository<BatchMedicine>,
        @InjectRepository(Cabinet) private cabinetRepo: Repository<Cabinet>,
        @InjectRepository(HistoryExportMedicine) private hisExMedRepo: Repository<HistoryExportMedicine>,
    ) {}

    async createMedicine(createMedicineDto: CreateMedicineDto) {
        const medicine = await this.cabinetRepo.findOne({
            where: { medicine_id: createMedicineDto.medicine_id },
        });

        return medicine
            ? { message: 'Medicine already exists' }
            : this.cabinetRepo.save(createMedicineDto);
    }

    async createBatch(createBatchDto: CreateBatchDto) {
        let messages: string[] = [];

        const { medicines, ...detail } = createBatchDto;

        const batchDetailEntity = this.batchDetailRepo.create(detail);

        for (const medicine of medicines) {
            const medicineEntity = await this.cabinetRepo.findOne({
                where: { medicine_id: medicine.medicine_id },
            });

            if (medicineEntity) {
                const batchMedicineEntity = this.batchMedicineRepo.create(
                    Object.assign({}, medicine),
                );

                batchMedicineEntity.batchDetail = batchDetailEntity;
                batchMedicineEntity.medicine = medicineEntity;
                batchMedicineEntity.remaining = medicine.quantity;

                batchDetailEntity.total_type += 1;
                // batchDetailEntity.import_date = new Date();

                medicineEntity.remaining += medicine.quantity;

                await this.cabinetRepo.save(medicineEntity);
                await this.batchMedicineRepo.save(batchMedicineEntity);
                messages.push(`Medicine ${medicine.medicine_id} added to batch`);
            } else {
                messages.push(`Medicine ${medicine.medicine_id} not found`);
            }
        }

        if (batchDetailEntity.total_type) await this.batchDetailRepo.save(batchDetailEntity);
        return { messages };
    }

    async getMedicineById(medicine_id: string) {
        const medicine = await this.cabinetRepo.findOne({
            where: { medicine_id },
            relations: ['batchMedicines'],
        });

        return medicine ? medicine : { message: 'Medicine not found' };
    }

    async useMedicine(medicine_id: string, amount: number) {
        const medicine = await this.cabinetRepo.findOne({
            where: { medicine_id },
            relations: ['batchMedicines'],
        });

        if(!medicine) return  {
            message: `not found!`,
        };

        if (medicine.remaining <= amount || amount <= 0) {
            return {
                message: `Cannot take more amount of medicine from cabinet! Remaining: ${medicine.remaining}`,
            };
        }

        medicine.remaining -= amount;

        await this.cabinetRepo.save(medicine);

        const batchMedicines = medicine.batchMedicines.filter((batchMedicine) => {
            return batchMedicine.remaining > 0;
        });

        batchMedicines.sort((a, b) => {
            return a.expire.getTime() - b.expire.getTime();
        });

        let targetBatches = [];
        for (const batch of batchMedicines) {
            if (amount >= batch.remaining) {
                amount -= batch.remaining;
                batch.remaining = 0;
                targetBatches.push(batch);
            } else {
                batch.remaining -= amount;
                amount = 0;
                targetBatches.push(batch);
            }

            await this.batchMedicineRepo.save(batch);
            const log = this.hisExMedRepo.create({
                medicine_id: medicine.medicine_id,
                export_date: new Date(),
                costOut: medicine.costOut,
                batchMedicine: batch,
            })
            await this.hisExMedRepo.save(log);
            if (!amount) break;
        }
        return targetBatches;
    }

    async updateCostOut(medicine_id: string, cost: number) {
        const medicine = await this.cabinetRepo.findOne({
            where: { medicine_id },
        });

        if(!medicine) return  {
            message: `not found!`,
        };

        medicine.costOut = cost;

        await this.cabinetRepo.save(medicine);
        
        return { message: "success" }
    }

    async getHisByMedId(medicine_id: string) {
        const logs = await this.hisExMedRepo.find({
            where: { medicine_id },
        });

        if(!logs) return { message: "No logs found"}

        return logs;
    }

    async getHisByBatId(id: string) {
        const batch = await this.batchDetailRepo.findOne({
            where: { id },
            relations: ["batchMedicines"]
        });

        if(!batch) return { message: "No batches found"}

        const logs = [];

        batch.batchMedicines.forEach((batch) => {
            logs.push(this.getHisByBatId(batch.medicine_id))
        })

        return logs;

    }
        
    
}
