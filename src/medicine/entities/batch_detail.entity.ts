import 'reflect-metadata';
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import { BatchMedicine } from './batch_medicine.entity';

@Entity({ name: 'batch_details' })
export class BatchDetail extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    status: string;

    @Column()
    placer_name: string;

    @Column()
    placer_CID: string;

    @Column()
    placer_phone: string;

    @Column()
    import_date: Date;

    @Column()
    total_type: number;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => BatchMedicine, (batchMedicine) => batchMedicine.batchDetail)
    batchMedicines: BatchMedicine[];
}
