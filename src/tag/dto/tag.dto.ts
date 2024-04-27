import { ApiProperty } from "@nestjs/swagger";
import { IsString} from "class-validator";

export class TagDto {
    @ApiProperty()
    @IsString()
    content: string
}
