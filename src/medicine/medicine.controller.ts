import { Controller, Get, Post, Body, Patch, Param, HttpCode, HttpStatus } from '@nestjs/common';

import { Public } from 'src/common/decorators/auth.decorator';
import { MedicineService } from './medicine.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    // @UserRoles(Role.Admin)
    @Public() // <- add this for testing
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
        console.log('do controller');
        return this.medicineService.createMedicine(createMedicineDto);
    }

    @Public() // <- add this for testing
    @HttpCode(HttpStatus.CREATED)
    @Post('/batch')
    create(@Body() createBatchDto: CreateBatchDto) {
        return this.medicineService.createBatch(createBatchDto);
    }

    @Public() // <- add this for testing
    @Get(':id')
    getMedicine(@Param('id') medicine_id: string) {
        return this.medicineService.getMedicine(medicine_id);
    }

    @Public() // <- add this for testing
    @Patch('use/:id')
    useMedicine(@Param('id') medicine_id: string, @Body('amount') amount: number) {
        return this.medicineService.useMedicine(medicine_id, amount);
    }

    @Public() // <- add this for testing
    @Patch('cost/:id')
    updateCostOut(@Param('id') medicine_id: string, @Body('cost') newCost: number) {
        return this.medicineService.updateCostOut(medicine_id, newCost);
    }

    @Public() // <- add this for testing
    @Get('log/:id')
    getLogsById(@Param('id') medicine_id: string) {
        return this.medicineService.getLogsById(medicine_id);
    }

    @Public() // <- add this for testing
    @Get('batch/log/:id')
    getLogsByBatchId(@Param('id') id: string) {
        return this.medicineService.getLogsByBatchId(id);
    }
}
