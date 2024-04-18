import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { BatchMedicine } from './batch_medicine.entity';

@Entity({ name: 'medicine_logs' })
export class MedicineLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    medicine_id: string;

    @Column()
    export_date: Date;

    @Column()
    cost_out: number;

    @Column()
    prev_remaining: number;

    @Column()
    curr_remaining: number;

    @Column()
    description: string;

    @ManyToOne(() => BatchMedicine, (batchMedicine) => batchMedicine.medicineLogs, { cascade: true })
    @JoinColumn({ name: 'batchMedicine_id' })
    batchMedicine: BatchMedicine;
}
