import 'reflect-metadata';
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm';

@Entity({ name: 'details' })
export class Batch extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    detail_id: string;

    @Column()
    // @OneToOne(() => )
    batch_id: string;

    @Column()
    medicine_id: string;

    @Column()
    exp: Date;

    @Column()
    vendors: string;

    @Column()
    remaining: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
