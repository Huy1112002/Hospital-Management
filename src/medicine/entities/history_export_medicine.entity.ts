import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { BatchMedicine } from './batch_medicine.entity';

@Entity({ name: 'history_export_medicines' })
export class HistoryExportMedicine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    medicine_id: string;

    @Column()
    export_date: Date;

    @Column()
    costOut: number;

    @Column()
    batchMedicine_id: string;

    @ManyToOne(() => BatchMedicine, (batchMedicine) => batchMedicine.historyExports, { cascade: true })
    @JoinColumn({ name: 'batchMedicine_id' })
    batchMedicine: BatchMedicine;

}
