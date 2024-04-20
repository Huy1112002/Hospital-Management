import 'reflect-metadata';
import { BaseEntity, Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { AvailableMedicine } from './available_medicine.entity';

@Entity({ name: 'cabinet' })
export class Cabinet extends BaseEntity {
    @PrimaryColumn()
    medicine_id: string;

    @Column()
    name: string;

    @Column()
    remaining: number;

    @Column()
    cost_out: number;

    @Column()
    unit: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'json' })
    ingredients: object;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => AvailableMedicine, (availableMedicine) => availableMedicine.medicine)
    availableMedicines: AvailableMedicine[];
}
