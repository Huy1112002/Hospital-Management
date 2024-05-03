import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsDate, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsBoolean()
    isMale: boolean;

    @IsOptional()
    @IsDate()
    date_of_birth: Date;

    @IsOptional()
    @Length(12)
    CID: string;

    @IsOptional()
    @Length(10)
    phone: string;
}
