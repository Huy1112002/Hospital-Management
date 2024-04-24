import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { RolesGuard } from '../common/guards/role.guard';
import { UserRoles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

import { Public } from 'src/common/decorators/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

// @UserRoles(Role.Admin)
@Controller('machines')
export class MachinesController {
    constructor(private readonly machinesService: MachinesService) {}

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Post()
    create(@Body() createMachineDto: CreateMachineDto) {
        return this.machinesService.create(createMachineDto);
    }

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Get()
    findAll() {
        return this.machinesService.findAll();
    }

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.machinesService.findOne(+id);
    }

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
        return this.machinesService.update(+id, updateMachineDto);
    }

    @ApiBearerAuth()
    @Public() // <- add this for testing
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.machinesService.remove(+id);
    }
}
