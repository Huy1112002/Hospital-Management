import "reflect-metadata";
import { ChildEntity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from "src/common/enums/role.enum";
import { Appointment } from "src/appointments/entities/appointments.entity";

@ChildEntity(Role.Nurse)
export class Nurse extends User {
    @OneToMany(() => Appointment, (appointment) => appointment.nurse)
    appointments: Appointment[];
}