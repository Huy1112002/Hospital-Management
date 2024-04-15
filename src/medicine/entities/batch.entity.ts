import 'reflect-metadata';
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'batches' })
export class Batch extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    batch_id: string;

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

    @Column({ type: 'json' })
    medicines: object;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
