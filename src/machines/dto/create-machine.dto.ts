export class CreateMachineDto {
    name: string
    vendor: string
    status: string
    //optional
    description?: string = ''
}
