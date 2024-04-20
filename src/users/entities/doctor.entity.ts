import 'reflect-metadata';
import { ChildEntity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from "src/common/enums/role.enum";
import { Appointment } from "src/appointments/entities/appointments.entity";

@ChildEntity(Role.Doctor)
export class Doctor extends User {
    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];
}
