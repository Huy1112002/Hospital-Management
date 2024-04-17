import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BatchDetail } from './batch_detail.entity';
import { Cabinet } from './cabinet.entity';
import { HistoryExportMedicine } from './history_export_medicine.entity';

@Entity({ name: 'batch_medicines' })
export class BatchMedicine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @Column()
    remaining: number;

    @Column()
    costIn: number;

    // FIX THIS, NOT NULLABLE
    @Column()//{ nullable: true }
    expire: Date;

    @Column()
    vendor: string;

    @Column()
    batchDetail_id: string;

    @Column()
    medicine_id: string;

    @ManyToOne(() => BatchDetail, (batchDetail) => batchDetail.batchMedicines, { cascade: true })
    @JoinColumn({ name: 'batchDetail_id' })
    batchDetail: BatchDetail;

    @ManyToOne(() => Cabinet, (cabinet) => cabinet.batchMedicines, { cascade: true })
    @JoinColumn({ name: 'medicine_id' })
    medicine: Cabinet;

    @OneToMany(() => HistoryExportMedicine, (historyExport) =>historyExport.batchMedicine)
    historyExports: HistoryExportMedicine[];
}
