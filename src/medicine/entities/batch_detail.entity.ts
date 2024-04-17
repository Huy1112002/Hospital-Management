import 'reflect-metadata';
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
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

    // FIX THIS, NOT NULLABLE
    @Column({ nullable: true })
    import_date: Date;

    @Column()
    total_type: number;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => BatchMedicine, (batchMedicine) => batchMedicine.batchDetail)
    batchMedicines: BatchMedicine[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
