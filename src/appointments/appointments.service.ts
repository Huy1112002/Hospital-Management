import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus, Appointment } from './entities/appointments.entity';
import { Between, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository, TreeLevelColumn } from 'typeorm';
import { Role } from 'src/common/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { getRandomElement } from 'src/common/ultils/get_random';
import { CreateFirstAppointment } from './dto/create-first-dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/entities/user.entity';
import { Patient } from 'src/users/entities/patient.entity';
import { Doctor } from 'src/users/entities/doctor.entity';
import { MedicineService } from 'src/medicine/medicine.service';
import { NotEquals } from 'class-validator';
import { elementAt } from 'rxjs';
import { randomInt } from 'crypto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private examinationRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private userService: UsersService,
    private authService: AuthService,
    private medicineService: MedicineService,
  )
  {}

  async create(
    patient_id: string, 
    doctor_id: string, 
    createExamninationDto: CreateAppointmentDto
  ): Promise<any> {
    const checkExits: boolean = await this.examinationRepository.exists({
      where:
        {
          patient: {user_id: patient_id},
          date: createExamninationDto.date,
          queue_number: Between(createExamninationDto.min_appoinment_number, createExamninationDto.max_appoinment_number),
        }
    });
    if(checkExits) return new BadRequestException('Examinations is exits in this time!');

    const nurseList = await this.userService.getAllNurse();
    const nurse = getRandomElement(nurseList)

    const appointment_number: number = createExamninationDto.min_appoinment_number + randomInt(createExamninationDto.max_appoinment_number - createExamninationDto.min_appoinment_number);
    for(let i = createExamninationDto.min_appoinment_number; i <= createExamninationDto.max_appoinment_number; i++) {
      const checkValid: boolean = await this.examinationRepository.exists({
        where: {
          patient: {user_id: patient_id},
          doctor: {user_id: doctor_id},
          date: createExamninationDto.date,
          queue_number: i,
        }
      })

      if(checkValid) continue;

      return await this.examinationRepository
      .save({
        date: createExamninationDto.date,
        queue_number: appointment_number,
        doctor: { user_id: doctor_id},
        patient: { user_id: patient_id },
        nurse: {user_id: nurse.user_id},
      })
    }
  }

  async createFirstTime(
    createFirstRegister: CreateFirstAppointment,
  ) {
    let patient: User;
    try {
      patient = await this.userService.queryUser(createFirstRegister.email, createFirstRegister.role);
      if(patient == null) {
        patient = await this.authService.signUp(createFirstRegister);
      } else {
        throw new BadRequestException("Email is exits! Please register with your account!")
      }
    } catch (err: any) {
      return err;
    }

    const checkExits: boolean = await this.examinationRepository.existsBy({
      patient: {user_id: patient.user_id},
      date: createFirstRegister.date,
    });
    if(checkExits) return new BadRequestException('Examinations is exits in this date!');
    
    const doctorList = await this.doctorRepository.findBy({
      appointments: {
        date: Not(createFirstRegister.date)
      }
    });
    const doctor = getRandomElement(doctorList)

    const nurseList = await this.userService.getAllNurse()
    const nurse = getRandomElement(nurseList)

    const appointment = this.examinationRepository
    .save({
      ...createFirstRegister,
      doctor: {user_id: doctor.user_id},
      patient: patient,
      nurse: {user_id: nurse.user_id},
    })

    return {
      appointment, 
      user: {
        email: createFirstRegister.email,
        password: createFirstRegister.password,
      }
    }
  }

  findAll(user_id: string, user_role: Role, src: AppointmentStatus) {
    switch (user_role) {
      case Role.Doctor:
        return this.examinationRepository.find({
          select: {
            id: true,
            disease: true,
            level: true,
            underlyingDisease: true,
            description: true,
            advice: true,
            date: true,
            queue_number: true,
            patient: {
              user_id: true,
              user_name: true,
              CID: true,
              phone: true,
              date_of_birth: true,
              isMale: true,
            }
          },
          relations: {
            patient: true,
          },
          where: {
            doctor: { user_id: user_id},
            status: src,
          }
        });
      
      case Role.Patient:
        return this.examinationRepository.find({
          select: {
            id: true,
            disease: true,
            level: true,
            underlyingDisease: true,
            description: true,
            advice: true,
            date: true,
            queue_number: true,
            doctor: {
              user_id: true,
              user_name: true,
              CID: true,
              phone: true,
              date_of_birth: true,
              isMale: true,
            }
          },
          relations: {
            doctor: true,
          },
          where: {
            patient: { user_id: user_id },
            status: src,
          }
        })

      case Role.Admin:
        return this.examinationRepository.find({
          select: {
            id: true,
            disease: true,
            level: true,
            underlyingDisease: true,
            description: true,
            advice: true,
            date: true,
            queue_number: true,
            patient: {
              user_id: true,
              user_name: true,
              CID: true,
              phone: true,
              date_of_birth: true,
              isMale: true,
            },
            doctor: {
              user_id: true,
              user_name: true,
              CID: true,
              phone: true,
              date_of_birth: true,
              isMale: true,
            }
          },
          relations: {
            doctor: true,
            patient: true,
          },
          where: {
            status: src,
          }
        })
    }
  }

  findOne(user_id: string, user_role: string ,id: string) {
    switch (user_role) {
      case (Role.Doctor):
        return this.examinationRepository.findOneBy({
          doctor: {user_id: user_id},
          id: id,
        })

      case (Role.Patient):
        return this.examinationRepository.findOneBy({
          patient: {user_id: user_id},
          id: id,
        })

      case (Role.Admin):
        return this.examinationRepository.findOneBy({id})
    }
  }

  cancle(id: string) {
    return this.examinationRepository.update(id, {status: AppointmentStatus.CANCEL});
  }

  async update(
    doctor_id: string, 
    appointment_id: string, 
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<any> {
    try {
      const doctor = await this.userService.findOneById(doctor_id);
      if(!doctor) throw new NotFoundException("Doctor is not exits!"); 

      var medicinesList = updateAppointmentDto.medicinesList
      if(updateAppointmentDto.medicinesList) {
        delete updateAppointmentDto.medicinesList;
      }

      const appointment = this.examinationRepository.update(
        {
          doctor: {user_id: doctor_id},
          id: appointment_id,
        },
        {
          ...updateAppointmentDto,
          status: AppointmentStatus.DONE,
        })

      const medicine = medicinesList.forEach(medicine => {
        try {
          this.medicineService.useMedicine(medicine.medicine_id, medicine.amount)
        } catch (err: any) {
          return err;
        }
      })

      return appointment;
    } catch (err: any) {
      return err;
    }
  }

  async getSchedule (
    doctor_id: string,
  ) {
    const doctor = await this.userService.findOneById(doctor_id);
    if (doctor == null) return new NotFoundException("Doctor is not exits!");
    
    return await this.examinationRepository.find({
      select: {
        date: true,
        id: true,
      },
      where: {
        doctor: {
          user_id: doctor_id,
        },
        status: AppointmentStatus.CREATED,
      }
    })
  }

  async findFreeDoctor (
    createAppointmentDto: CreateAppointmentDto
  ) {
    const min = createAppointmentDto.min_appoinment_number, max = createAppointmentDto.max_appoinment_number;
    if ( min > max) throw new BadRequestException("min_number must be less than max_number");
    const unfreedDoctor = await this.doctorRepository
      .createQueryBuilder("D")
      .select([
        "`D`.`user_id` as user_id",
        "`D`.`user_name` as user_name",
        "`D`.`phone` as phone",
        "COUNT(A.id) as count"
      ])
      .leftJoin("D.appointments", "A")
      .where("`A`.`date` = :date", {date: createAppointmentDto.date})
      .andWhere("`A`.`queue_number` BETWEEN :min AND :max", {min: min, max: max})
      .groupBy("`D`.`user_id`")
      .having("COUNT(A.id) < :range", {range: max - min + 1})
      .getRawMany();

    const freeDoctor = await this.doctorRepository
      .createQueryBuilder("D")
      .select([
        "D.user_id as user_id",
        "D.user_name as user_name",
        "D.email as email",
      ])
      .where("D.user_id NOT IN (SELECT D.user_id FROM appointments A WHERE A.doctorUserid = D.user_id AND A.date = :date)", {date: createAppointmentDto.date})
      .orWhere("D.user_id IN (SELECT D.user_id FROM appointments A WHERE A.doctorUserid = D.user_id AND A.date = :date AND (A.queue_number NOT BETWEEN :min AND :max)) AND D.user_id NOT IN (SELECT D.user_id FROM appointments A WHERE A.doctorUserid = D.user_id AND A.date = :date AND (A.queue_number BETWEEN :min AND :max))", {date: createAppointmentDto.date, min: min, max: max})
      .getRawMany()

      return [...unfreedDoctor, ...freeDoctor];
  }
}
