import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { BatchDetail } from './batch_detail.entity';
import { AvailableMedicine } from './available_medicine.entity';
import { MedicineLog } from './medicine_log.entity';

@Entity({ name: 'batch_medicines' })
export class BatchMedicine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    medicine_id: string;

    @Column()
    quantity: number;

    @Column()
    costIn: number;

    @Column()
    expire: Date;

    @Column()
    vendor: string;

    @ManyToOne(() => BatchDetail, (batchDetail) => batchDetail.batchMedicines, { cascade: true })
    @JoinColumn({ name: 'batchDetail_id' })
    batchDetail: BatchDetail;

    @OneToOne(() => AvailableMedicine, (availableMedicine) => availableMedicine.batchMedicine)
    availableMedicine: AvailableMedicine;

    @OneToMany(() => MedicineLog, (log) => log.batchMedicine)
    medicineLogs: MedicineLog[];
}
