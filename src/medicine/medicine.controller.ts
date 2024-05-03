import { Controller, Get, Post, Body, Patch, Param, HttpCode, HttpStatus } from '@nestjs/common';

import { UserRoles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { MedicineService } from './medicine.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    // ### Controller for batch
    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    @Post('batch') // create new batch
    create(@Body() createBatchDto: CreateBatchDto) {
        return this.medicineService.createBatch(createBatchDto);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Get('batch/log/:id') // get all logs of batch by id
    getLogsByBatchId(@Param('id') id: string) {
        return this.medicineService.getLogsByBatchId(id);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Get('batch') // get all batch
    getBatches() {
        return this.medicineService.getBatches();
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Get('batch/:id') // get batch by id
    getBatch(@Param('id') id: string) {
        return this.medicineService.getBatch(id);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    @Post() // create new medicine
    createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
        return this.medicineService.createMedicine(createMedicineDto);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Get('log/:id') // get logs of medicine by id
    getLogsById(@Param('id') medicine_id: string) {
        return this.medicineService.getLogsById(medicine_id);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Patch('use/:id') // use medicine, auto apdate cabinet and available_medicine
    useMedicine(@Param('id') medicine_id: string, @Body('amount') amount: number) {
        return this.medicineService.useMedicine(medicine_id, amount);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Patch('cost/:id') // update cost_out of medicine
    updateCostOut(@Param('id') medicine_id: string, @Body('cost') newCost: number) {
        return this.medicineService.updateCostOut(medicine_id, newCost);
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Get() // get all medicine
    getMedicines() {
        return this.medicineService.getMedicines();
    }

    @UserRoles(Role.Admin, Role.Doctor, Role.Nurse)
    @ApiBearerAuth()
    @Get(':id') // get medicine by id
    getMedicine(@Param('id') medicine_id: string) {
        return this.medicineService.getMedicine(medicine_id);
    }
}
