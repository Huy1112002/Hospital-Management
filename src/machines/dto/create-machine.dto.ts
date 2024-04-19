import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMachineDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    vendor: string;

    @ApiProperty()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsOptional()
    description: string = '';
}
