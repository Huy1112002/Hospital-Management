import 'reflect-metadata';
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cabinet' })
export class Batch extends BaseEntity {
    @PrimaryColumn()
    medicine_id: string;

    @Column()
    available_medicine: number;

    @Column()
    name: string;

    @Column({ type: 'json' })
    description: object;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
