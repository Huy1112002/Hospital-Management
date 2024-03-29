import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SigninDto{
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: any;
}