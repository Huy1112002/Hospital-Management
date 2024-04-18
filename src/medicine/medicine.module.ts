import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineController } from './medicine.controller';

import { BatchDetail } from './entities/batch_detail.entity';
import { BatchMedicine } from './entities/batch_medicine.entity';
import { Cabinet } from './entities/cabinet.entity';
import { AvailableMedicine } from './entities/available_medicine.entity';
import { MedicineLog } from './entities/medicine_log.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BatchDetail,
            BatchMedicine,
            Cabinet,
            AvailableMedicine,
            MedicineLog,
        ]),
    ],
    providers: [MedicineService],
    controllers: [MedicineController],
    exports: [MedicineService],
})
export class MedicineModule {}
