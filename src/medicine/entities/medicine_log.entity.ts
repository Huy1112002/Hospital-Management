import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { BatchMedicine } from './batch_medicine.entity';

@Entity({ name: 'medicine_logs' })
export class MedicineLog {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    medicine_id: string;

    @Column()
    export_date: Date;

    @Column()
    quantity: number;

    @Column()
    costOut: number;

    @Column()
    description: string;

    @ManyToOne(() => BatchMedicine, (batchMedicine) => batchMedicine.medicineLogs, {
        cascade: true,
    })
    @JoinColumn({ name: 'batchMedicine_id' })
    batchMedicine: BatchMedicine;
}
