import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus, Appointment } from './entities/appointments.entity';
import { Repository, TreeLevelColumn } from 'typeorm';
import { Role } from 'src/common/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { getRandomElement } from 'src/common/ultils/get_random';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private examinationRepository: Repository<Appointment>,
    private userService: UsersService,
  )
  {}

  async create(
    patient_id: string, 
    doctor_id: string, 
    createExamninationDto: CreateAppointmentDto
  ): Promise<any> {
    const checkExits: boolean = await this.examinationRepository.existsBy({
      patient: {user_id: patient_id},
      doctor: {user_id: doctor_id},
      date: createExamninationDto.date,
    });
    if(checkExits == true)return new BadRequestException('Examinations is exits in this date!');

    const nurseList = await this.userService.getAllNurse();
    const nurse = getRandomElement(nurseList)

    return this.examinationRepository
      .create({
        ...createExamninationDto,
        doctor: { user_id: doctor_id},
        patient: { user_id: patient_id },
        nurse: nurse,
      })
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

  update(
    doctor_id: string, 
    appointment_id: string, 
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<any> {
    return this.examinationRepository.update(
      {
        doctor: {user_id: doctor_id},
        id: appointment_id,
      },
      {
        ...updateAppointmentDto,
        status: AppointmentStatus.DONE,
      }
    )
  }

  getSchedule (
    doctor_id: string,
  ) {
    return this.examinationRepository.find({
      select: {
        date: true,
      },
      where: {
        doctor: {
          user_id: doctor_id,
        },
        status: AppointmentStatus.CREATED,
      }
    })
  }
}
