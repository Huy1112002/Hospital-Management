import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, IsUUID, Max, Min, Validate } from "class-validator";
import { DateValidator } from "src/common/decorators/date.validator";

export class CreateAppointmentDto {
    @ApiProperty()
    @IsString()
    @Validate(DateValidator)
    date: string;

    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @Max(10)
    @IsInt()
    min_appoinment_number: number;

    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(10)
    max_appoinment_number: number;
}