import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';

import { Public } from 'src/common/decorators/auth.decorator';
import { UserRoles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { MedicineService } from './medicine.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    // @UserRoles(Role.Admin)
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
        return this.medicineService.createMedicine(createMedicineDto);
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('/batch')
    create(@Body() createBatchDto: CreateBatchDto) {
        return this.medicineService.createBatch(createBatchDto);
    }

    @Public()
    @Get(':id')
    getMedicineById(@Param('id') medicine_id: string) {
        return this.medicineService.getMedicineById(medicine_id);
    }
}
