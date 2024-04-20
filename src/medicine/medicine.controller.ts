import { Controller, Get, Post, Body, Patch, Param, HttpCode, HttpStatus } from '@nestjs/common';

import { Public } from 'src/common/decorators/auth.decorator';
import { MedicineService } from './medicine.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    // ### Controller for batch
    @Public() // <- add this for testing
    @HttpCode(HttpStatus.CREATED)
    @Post('batch') // create new batch
    create(@Body() createBatchDto: CreateBatchDto) {
        return this.medicineService.createBatch(createBatchDto);
    }

    @Public() // <- add this for testing
    @Get('batch/log/:id') // get all logs of batch by id
    getLogsByBatchId(@Param('id') id: string) {
        return this.medicineService.getLogsByBatchId(id);
    }

    @Public() // <- add this for testing
    @Get('batch') // get all batch
    getBatches() {
        return this.medicineService.getBatches();
    }

    @Public() // <- add this for testing
    @Get('batch/:id') // get batch by id
    getBatch(@Param('id') id: string) {
        return this.medicineService.getBatch(id);
    }

    // ### Controller for medicine
    @Public() // <- add this for testing
    @HttpCode(HttpStatus.CREATED)
    @Post() // create new medicine
    createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
        return this.medicineService.createMedicine(createMedicineDto);
    }

    @Public() // <- add this for testing
    @Get('log/:id') // get logs of medicine by id
    getLogsById(@Param('id') medicine_id: string) {
        return this.medicineService.getLogsById(medicine_id);
    }

    @Public() // <- add this for testing
    @Patch('use/:id') // use medicine, auto apdate cabinet and available_medicine
    useMedicine(@Param('id') medicine_id: string, @Body('amount') amount: number) {
        return this.medicineService.useMedicine(medicine_id, amount);
    }

    @Public() // <- add this for testing
    @Patch('cost/:id') // update cost_out of medicine
    updateCostOut(@Param('id') medicine_id: string, @Body('cost') newCost: number) {
        return this.medicineService.updateCostOut(medicine_id, newCost);
    }

    @Public() // <- add this for testing
    @Get() // get all medicine
    getMedicines() {
        return this.medicineService.getMedicines();
    }

    @Public() // <- add this for testing
    @Get(':id') // get medicine by id
    getMedicine(@Param('id') medicine_id: string) {
        return this.medicineService.getMedicine(medicine_id);
    }
}
