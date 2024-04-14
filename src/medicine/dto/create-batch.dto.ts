import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsDate, Length, IsOptional } from 'class-validator';

export class CreateBatchDto {
    @ApiProperty()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    placer_name: string;

    @ApiProperty()
    @IsNotEmpty()
    placer_CID: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(10)
    placer_phone: string;

    // @ApiProperty()
    // @IsOptional()
    // @IsDate()
    // import_date: Date;

    @ApiProperty()
    @IsNotEmpty()
    total_type: number;

    @ApiProperty({ isArray: true })
    @IsNotEmpty()
    @IsArray()
    medicines: object;

    @ApiProperty()
    @IsOptional()
    description: string;
}
