import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsDate, IsOptional, Length, MaxLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @MaxLength(50)
    user_name: string;

    @IsOptional()
    @IsBoolean()
    isMale: boolean;

    @IsOptional()
    date_of_birth: Date;

    @IsOptional()
    @Length(12)
    CID: string;

    @IsOptional()
    @Length(10)
    phone: string;
}
