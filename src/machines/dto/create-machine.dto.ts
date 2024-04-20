import { IsOptional, IsNotEmpty } from "class-validator"

export class CreateMachineDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    vendor: string

    @IsNotEmpty()
    status: string
    //optional
    @IsOptional()
    description: string = ''
}
