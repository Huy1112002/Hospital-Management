import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { UserRoles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { State } from '../common/enums/machine.enum';

// @UserRoles(Role.Admin)
@Controller('machines')
export class MachinesController {
    constructor(private readonly machinesService: MachinesService) {}

    @UserRoles(Role.Admin)
    @ApiBearerAuth()
    @Post()
    async create(@Body() createMachineDto: CreateMachineDto) {
        return await this.machinesService.create(createMachineDto);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Get()
    async findAll() {
        return await this.machinesService.findAll();
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Get('/find/:state')
    async findbyState(@Param('state') state: State) {
        return await this.machinesService.findbyState(state);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.machinesService.findOne(+id);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
        return await this.machinesService.update(+id, updateMachineDto);
    }

    @UserRoles(Role.Admin)
    @ApiBearerAuth()
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.machinesService.remove(+id);
    }
}
