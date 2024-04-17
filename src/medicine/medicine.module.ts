import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineController } from './medicine.controller';

import { BatchDetail } from './entities/batch_detail.entity';
import { BatchMedicine } from './entities/batch_medicine.entity';
import { Cabinet } from './entities/cabinet.entity';
import { HistoryExportMedicine } from './entities/history_export_medicine.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BatchDetail, BatchMedicine, Cabinet, HistoryExportMedicine])],
    providers: [MedicineService],
    controllers: [MedicineController],
    exports: [MedicineService],
})
export class MedicineModule {}
