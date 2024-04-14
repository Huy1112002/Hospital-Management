import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UserRoles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

import { MedicineService } from './medicine.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { Public } from 'src/common/decorators/auth.decorator';

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    // @UserRoles(Role.Admin)
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createBatchDto: CreateBatchDto) {
        return this.medicineService.create(createBatchDto);
    }
}
