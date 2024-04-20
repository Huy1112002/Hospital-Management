import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UserRoles } from 'src/common/decorators/roles.decorator';
import { AppointmentStatus } from './entities/appointments.entity';
import { User } from 'src/users/entities/user.entity';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly examninationsService: AppointmentsService) {}

  @Post()
  @UserRoles(Role.Patient)
  create(
    @GetCurrentUserId() user_id: string, 
    @Query('doctor-id') doctor_id: string, 
    @Body() createAppointmentDto: CreateAppointmentDto
  ) {
    return this.examninationsService.create(user_id, doctor_id, createAppointmentDto);
  }

  @Get()
  findAll(
    @GetCurrentUserId() user_id: string, 
    @GetCurrentUser('role') role: Role, 
    @Query('src') src: AppointmentStatus
  ) {
    return this.examninationsService.findAll(user_id, role, src);
  }

  @Get(':id')
  findOne(
    @GetCurrentUserId() user_id: string, 
    @GetCurrentUser('role') role: Role,
    @Param('id') id: string
  ) {
    return this.examninationsService.findOne(user_id, role, id);
  }

  @UserRoles(Role.Admin)
  @Patch(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.examninationsService.cancle(id);
  }

  @UserRoles(Role.Doctor)
  @Patch(':id/advice')
  advice(
    @GetCurrentUserId() user_id: string, 
    @Param('id') id: string, 
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.examninationsService.update(user_id, id, updateAppointmentDto);
  }

  @Get('schedule/:doctor-id')
  getSchedule(
    @Param('doctor-id') doctor_id: string,
  ) {
    return this.examninationsService.getSchedule(doctor_id)
  }
}