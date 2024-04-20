import { Injectable } from '@nestjs/common';
import { CreateExamninationDto } from './dto/create-examnination.dto';
import { UpdateExamninationDto } from './dto/update-examnination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExaminationStatus, Examnination } from './entities/examnination.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class ExamninationsService {
  constructor(
    @InjectRepository(Examnination)
    private examinationRepository: Repository<Examnination>,
    private userService: UsersService,
  )
  {}

  async create(patient_id: string, createExamninationDto: CreateExamninationDto) {
    const patient = this.userService.findOneById(patient_id);
    return this.examinationRepository
      .create({
        disease: createExamninationDto.disease,
        level: createExamninationDto.level,
        underlyingDisease: createExamninationDto.underlyingDisease,
        description: createExamninationDto.description,
        doctor: { user_id: createExamninationDto.doctor_id },
        patient: { user_id: patient_id },
      })
  }

  findAll(user_id: string, user_role: Role, src: ExaminationStatus) {
    switch (user_role) {
      case Role.Doctor:
        return this.examinationRepository.findBy({
          doctor: { user_id: user_id},
          status: src,
        });
      
      case Role.Patient:
        return this.examinationRepository.findBy({
          patient: { user_id: user_id },
          status: src,
        })

      case Role.Admin:
        return this.examinationRepository.find()
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
    return this.examinationRepository.update(id, {status: ExaminationStatus.CANCEL});
  }
}
