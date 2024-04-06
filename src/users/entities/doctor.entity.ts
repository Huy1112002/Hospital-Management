import "reflect-metadata";
import { ChildEntity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from "src/common/enums/role.enum";
import { Examnination } from "src/examninations/entities/examnination.entity";

@ChildEntity(Role.Doctor)
export class Doctor extends User {
    @OneToMany(() => Examnination, (examination) => examination.doctor)
    examinations: Examnination[];
}