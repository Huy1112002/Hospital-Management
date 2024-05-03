import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, Length, MaxLength } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50)
    user_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    role: Role;

    @IsOptional()
    @Length(12)
    CID: string;

    @IsOptional()
    @Length(10)
    phone: string;

    @IsOptional()
    @IsBoolean()
    isMale: boolean;

    @IsOptional()
    @IsDate()
    date_of_birth: Date;
}
