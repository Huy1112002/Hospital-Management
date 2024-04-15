import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { BatchDetail } from './batch_detail.entity';
import { Cabinet } from './cabinet.entity';

@Entity({ name: 'batch_medicines' })
export class BatchMedicine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    // FIX THIS, NOT NULLABLE
    @Column({ nullable: true })
    expiration_date: Date;

    @Column()
    vendor: string;

    @ManyToOne(() => BatchDetail, (batchDetail) => batchDetail.batchMedicines, { cascade: true })
    @JoinColumn({ name: 'batchDetail_id' })
    batchDetail: BatchDetail;

    @ManyToOne(() => Cabinet, (cabinet) => cabinet.batchMedicines, { cascade: true })
    @JoinColumn({ name: 'medicine_id' })
    medicine: Cabinet;
}
