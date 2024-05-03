import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Max, MaxLength, Min } from "class-validator";
import { randomBytes } from "crypto";
import { Role } from "src/common/enums/role.enum";

export class CreateFirstAppointment {
    @ApiProperty()
    @IsString()
    date: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(10)
    appoinment_number: number;

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
