import { Doctor } from "src/users/entities/doctor.entity";
import { Nurse } from "src/users/entities/nurse.entity";
import { Patient } from "src/users/entities/patient.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum AppointmentStatus {
    CREATED='created',
    DONE='done',
    CANCEL='cancel',
}

@Entity({name: 'appointments'})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    disease: string;

    @Column()
    level: string;

    @Column()
    underlyingDisease: string;

    @Column()
    description: string;

    @Column()
    advice: string;

    @Column()
    date: string;

    @Column({type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.CREATED})
    status: AppointmentStatus;

    @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
    doctor: Doctor;

    @ManyToOne(() => Patient, (patient) => patient.appointments)
    patient: Patient;

    @ManyToOne(() => Nurse, (nurse) => nurse.appointments, {nullable: true})
    nurse: Nurse;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
