import 'reflect-metadata';
import { Role } from 'src/common/enums/role.enum';
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    TableInheritance,
} from 'typeorm';

@Entity({ name: 'user' })
@TableInheritance({ column: 'role' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column()
    user_name: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    isMale: boolean;

    @Column({ nullable: true })
    date_of_birth: Date;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true, unique: true })
    CID: string;

    @Column({ nullable: false })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;

    @Column({ nullable: true, select: false })
    hasedRt: string;
}
