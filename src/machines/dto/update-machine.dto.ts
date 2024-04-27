import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional} from 'class-validator';
import { State } from '../../common/enums/machine.enum';
import { TagDto } from '../../tag/dto/tag.dto';

export class UpdateMachineDto {
    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    vendor: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(State)
    status: State;

    @ApiProperty()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsOptional()
    tags: TagDto[]
}
