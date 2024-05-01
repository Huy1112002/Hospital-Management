import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length, MaxLength } from 'class-validator';
import { randomBytes } from 'crypto';
import { Role } from 'src/common/enums/role.enum';

export class CreateFirstAppointment {
    @ApiProperty()
    @IsString()
    date: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50)
    user_name: string;

    @IsOptional()
    @Length(12)
    CID: string;

    @IsOptional()
    @Length(10)
    phone: string;

    role: Role = Role.Patient;
    password: string = randomBytes(4).toString('hex');

    @IsOptional()
    isMale: boolean;

    @IsOptional()
    date_of_birth: Date;
}
