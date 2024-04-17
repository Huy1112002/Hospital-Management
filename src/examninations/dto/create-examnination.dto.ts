import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateExamninationDto {
    @ApiProperty()
    @IsString()
    disease: string;

    @ApiProperty()
    @IsString()
    level: string;

    @ApiProperty()
    @IsString()
    underlyingDisease: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsUUID()
    doctor_id: string;
}
