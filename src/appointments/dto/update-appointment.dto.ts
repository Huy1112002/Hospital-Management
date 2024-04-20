import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsString } from 'class-validator';

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
}
