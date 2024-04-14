import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineController } from './medicine.controller';
import { Batch } from './entities/batch.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Batch])],
    providers: [MedicineService],
    controllers: [MedicineController],
    exports: [MedicineService],
})
export class MedicineModule {}
