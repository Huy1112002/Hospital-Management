import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { RolesGuard } from '../common/guards/role.guard';
import { UserRoles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

import { Public } from 'src/common/decorators/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { State } from '../common/enums/machine.enum';

// @UserRoles(Role.Admin)
@Controller('machines')
export class MachinesController {
    constructor(private readonly machinesService: MachinesService) {}

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Post()
    async create(@Body() createMachineDto: CreateMachineDto) {
        return await this.machinesService.create(createMachineDto);
    }

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Get()
    async findAll() {
        return await this.machinesService.findAll();
    }

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Get('/find/:state')
    async findbyState(@Param('state') state: State) {
        return await this.machinesService.findbyState(state);
    }

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.machinesService.findOne(+id);
    }

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
        return await this.machinesService.update(+id, updateMachineDto);
    }

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.machinesService.remove(+id);
    }
}
