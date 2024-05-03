import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MedicineUse {
    @ApiProperty()
    @IsNotEmpty()
    medicine_id: string;

    @ApiProperty()
    @IsNotEmpty()
    amount: number;
}

export class UpdateAppointmentDto {
    @ApiProperty()
    @IsString()
    disease: string;

    @ApiProperty()
    @IsString()
    level: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    underlyingDisease: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ isArray: true, type: MedicineUse })
    @IsArray()
    @IsOptional()
    medicinesList: MedicineUse[];
}
