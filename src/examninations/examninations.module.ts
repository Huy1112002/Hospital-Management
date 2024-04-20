import { Module } from '@nestjs/common';
import { ExamninationsService } from './examninations.service';
import { ExamninationsController } from './examninations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examnination } from './entities/examnination.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Examnination]), UsersModule],
  controllers: [ExamninationsController],
  providers: [ExamninationsService],
})
export class ExamninationsModule {}
