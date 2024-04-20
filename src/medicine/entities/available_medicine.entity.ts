import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany } from 'typeorm';

import { Cabinet } from './cabinet.entity';
import { BatchMedicine } from './batch_medicine.entity';

@Entity({ name: 'available_medicines' })
export class AvailableMedicine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    remaining: number;

    @ManyToOne(() => Cabinet, (cabinet) => cabinet.availableMedicines, { cascade: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'medicine_id' })
    medicine: Cabinet;

    @OneToOne(() => BatchMedicine, (batchMedicine) => batchMedicine.availableMedicine, { cascade: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'batchMedicine_id' })
    batchMedicine: BatchMedicine;
}
