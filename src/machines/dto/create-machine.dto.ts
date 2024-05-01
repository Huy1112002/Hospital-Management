import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { State } from '../../common/enums/machine.enum';

export class CreateMachineDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    vendor: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(State)
    status: State;

    @ApiProperty()
    @IsOptional()
    description: string;
}
