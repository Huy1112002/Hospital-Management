import { PartialType } from '@nestjs/swagger';
import { CreateExamninationDto } from './create-examnination.dto';

export class UpdateExamninationDto extends PartialType(CreateExamninationDto) {}
