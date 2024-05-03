import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointments.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { Doctor } from 'src/users/entities/doctor.entity';
import { MedicineModule } from 'src/medicine/medicine.module';
import { DateValidator } from 'src/common/decorators/date.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Doctor]), UsersModule, AuthModule, MedicineModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, DateValidator],
})
export class AppointmentsModule {}
