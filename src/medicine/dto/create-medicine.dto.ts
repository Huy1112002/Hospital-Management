import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMedicineDto {
    @ApiProperty()
    @IsNotEmpty()
    medicine_id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    unit: string;

    @IsOptional()
    remaining: number = 0;

    @ApiProperty()
    @IsNotEmpty()
    cost_out: number;

    @ApiProperty({ isArray: true })
    @IsNotEmpty()
    ingredients: object;

    @IsOptional()
    description: string;
}
