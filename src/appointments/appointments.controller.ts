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
import { Public } from 'src/common/decorators/auth.decorator';
import { CreateFirstAppointment } from './dto/create-first-dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly examninationsService: AppointmentsService) {}

  @UserRoles(Role.Patient)
  @ApiBearerAuth()
  @Post()
  create(
    @GetCurrentUserId() user_id: string, 
    @Query('doctor_id') doctor_id: string, 
    @Body() createAppointmentDto: CreateAppointmentDto
  ) {
    return this.examninationsService.create(user_id, doctor_id, createAppointmentDto);
  }

  @Post('/first_register')
  @Public()
  createFirstRegister(
    @Body() createFirstRegister: CreateFirstAppointment,
  ) {
    return this.examninationsService.createFirstTime(createFirstRegister);
  }

  @ApiBearerAuth()
  @Get()
  findAll(
    @GetCurrentUserId() user_id: string, 
    @GetCurrentUser('role') role: Role, 
    @Query('src') src: AppointmentStatus
  ) {
    return this.examninationsService.findAll(user_id, role, src);
  }

  @UserRoles(Role.Patient)
  @Get('/freeDoctor')
  getFreeDoctor(
    @Query() createAppointmentDto: CreateAppointmentDto,
  ) {
    return this.examninationsService.findFreeDoctor(createAppointmentDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(
    @GetCurrentUserId() user_id: string, 
    @GetCurrentUser('role') role: Role,
    @Param('id') id: string
  ) {
    return this.examninationsService.findOne(user_id, role, id);
  }

  @UserRoles(Role.Admin, Role.Doctor, Role.Patient)
  @ApiBearerAuth()
  @Patch(':id/cancle')
  remove(
    @Param('id') id: string,
    @GetCurrentUserId() user_id: string,
    @GetCurrentUser('role') user_role: Role,
  ) {
    return this.examninationsService.cancle(id, user_id, user_role);
  }

  @UserRoles(Role.Doctor)
  @ApiBearerAuth()
  @Patch(':id/done')
  advice(
    @GetCurrentUserId() user_id: string, 
    @Param('id') id: string, 
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.examninationsService.update(user_id, id, updateAppointmentDto);
  }
}