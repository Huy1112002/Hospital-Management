import "reflect-metadata";
import { ChildEntity } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from "src/common/enums/role.enum";

@ChildEntity(Role.Doctor)
export class Doctor extends User {
}