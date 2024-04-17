import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMedicineDto {
    @ApiProperty()
    @IsNotEmpty()
    medicine_id: string;

    @IsOptional()
    remaining: number = 0;

    @ApiProperty()
    @IsNotEmpty()
    costOut: number;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    unit: string;

    @IsOptional()
    description: object;

    @ApiProperty()
    @IsNotEmpty()
    ingredients: object;
}
