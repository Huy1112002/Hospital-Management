import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsString, IsUUID } from "class-validator";

export class CreateAppointmentDto {
    @ApiProperty()
    @IsString()
    date: string;
}