import { ApiProperty } from "@nestjs/swagger";
import { IsString} from "class-validator";

export class UpdateTagDto {
    @ApiProperty()
    @IsString()
    content: string

    @ApiProperty()
    @IsString()
    og: string
}
