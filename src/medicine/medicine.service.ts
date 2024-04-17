import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BatchDetail } from './entities/batch_detail.entity';
import { BatchMedicine } from './entities/batch_medicine.entity';
import { Cabinet } from './entities/cabinet.entity';
import { CreateBatchDto } from './dto/create-batch.dto';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Injectable()
export class MedicineService {
    constructor(
        @InjectRepository(BatchDetail)
        private batchDetailRepo: Repository<BatchDetail>,
        @InjectRepository(BatchMedicine)
        private batchMedicineRepo: Repository<BatchMedicine>,
        @InjectRepository(Cabinet) private cabinetRepo: Repository<Cabinet>,
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
                const batchMedicineEntity = this.batchMedicineRepo.create(medicine);

                batchMedicineEntity.batchDetail = batchDetailEntity;
                batchMedicineEntity.medicine = medicineEntity;

                batchDetailEntity.total_type += 1;
                medicineEntity.remaining += medicine.quantity;

                await this.cabinetRepo.save(medicineEntity);
                await this.batchMedicineRepo.save(batchMedicineEntity);
                messages.push(`Medicine ${medicine.medicine_id} added to batch`);
            } else {
                messages.push(`Medicine ${medicine.medicine_id} not found`);
            }
        }

        await this.batchDetailRepo.save(batchDetailEntity);

        return { messages };
    }

    async getMedicineById(medicine_id: string) {
        const medicine = await this.cabinetRepo.findOne({
            where: { medicine_id },
            relations: ['batchMedicines'],
        });

        return medicine ? medicine : { message: 'Medicine not found' };
    }
}
