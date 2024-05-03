import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsDate, Length, IsOptional } from 'class-validator';

class Medicine {
    @ApiProperty()
    @IsNotEmpty()
    medicine_id: string;

    @ApiProperty()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    cost_in: number;

    @ApiProperty()
    @IsNotEmpty()
    expire: Date;

    @ApiProperty()
    @IsNotEmpty()
    vendor: string;
}

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

    @ApiProperty()
    @IsNotEmpty()
    import_date: Date;

    @IsOptional()
    total_type: number = 0;

    @ApiProperty({ isArray: true, type: Medicine })
    @IsNotEmpty()
    @IsArray()
    medicines: Medicine[];

    @ApiProperty()
    @IsOptional()
    description: string;
}
