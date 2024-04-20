import { IsOptional } from "class-validator"

export class UpdateMachineDto {
    @IsOptional()
    name: string

    @IsOptional()
    vendor:string

    @IsOptional()
    status: string

    @IsOptional()
    description: string
}
