import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMedicineDto {
    @ApiProperty()
    @IsNotEmpty()
    medicine_id: string;

    @ApiProperty()
    @IsNotEmpty()
    unit: string;

    @IsOptional()
    remaining: number = 0;

    @ApiProperty()
    @IsNotEmpty()
    costOut: number;

    @ApiProperty()
    @IsNotEmpty()
    ingredients: object;

    @IsOptional()
    description: object;
}
