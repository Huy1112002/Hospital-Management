import 'reflect-metadata';
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { BatchMedicine } from './batch_medicine.entity';

@Entity({ name: 'cabinet' })
export class Cabinet extends BaseEntity {
    @PrimaryColumn()
    medicine_id: string;

    @Column()
    remaining: number;

    @Column()
    name: string;

    @Column()
    unit: string;

    @Column({ type: 'json', nullable: true })
    description: object;

    @Column({ type: 'json' })
    ingredients: object;

    @OneToMany(() => BatchMedicine, (batchMedicine) => batchMedicine.medicine)
    batchMedicines: BatchMedicine[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
