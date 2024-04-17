import { Doctor } from "src/users/entities/doctor.entity";
import { Patient } from "src/users/entities/patient.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ExaminationStatus {
    CREATED='created',
    DONE='done',
    CANCEL='cancel',
}

@Entity({name: 'examinations'})
export class Examnination {
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

    @Column({type: 'enum', enum: ExaminationStatus, default: ExaminationStatus.CREATED})
    status: ExaminationStatus;

    @ManyToOne(() => Doctor, (doctor) => doctor.examinations)
    doctor: Doctor;

    @ManyToOne(() => Patient, (patient) => patient.examinations)
    patient: Patient;
}
