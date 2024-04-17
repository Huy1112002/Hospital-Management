import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExamninationsService } from './examninations.service';
import { CreateExamninationDto } from './dto/create-examnination.dto';
import { UpdateExamninationDto } from './dto/update-examnination.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UserRoles } from 'src/common/decorators/roles.decorator';
import { ExaminationStatus } from './entities/examnination.entity';

@Controller('examninations')
export class ExamninationsController {
  constructor(private readonly examninationsService: ExamninationsService) {}

  @Post()
  @UserRoles(Role.Patient)
  create(@GetCurrentUserId() user_id: string, @Body() createExamninationDto: CreateExamninationDto) {
    return this.examninationsService.create(user_id, createExamninationDto);
  }

  @Get()
  findAll(@GetCurrentUserId() user_id: string, @GetCurrentUser('role') role: Role, @Query('src') src: ExaminationStatus) {
    return this.examninationsService.findAll(user_id, role, src);
  }s

  @Get(':id')
  findOne(@GetCurrentUserId() user_id, @GetCurrentUser('role') role: Role,@Param('id') id: string) {
    return this.examninationsService.findOne(user_id, role, id);
  }

  @UserRoles(Role.Admin)
  @Patch(':id')
  remove(@Param('id') id: string) {
    return this.examninationsService.cancle(id);
  }
}