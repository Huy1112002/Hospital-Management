import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
    @ApiProperty()
    @IsString()
    disease: string;

    @ApiProperty()
    @IsString()
    level: string;

    @ApiProperty()
    @IsString()
    underlyingDisease: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    medicinesList: MedicineUse[];
}

export class MedicineUse {
    medicine_id: string;
    amount: number;
}
