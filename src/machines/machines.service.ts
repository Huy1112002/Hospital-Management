import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class MachinesService {
    constructor(
        @InjectRepository(Machine)
        private readonly machineRepo: Repository<Machine>,
        private readonly entityManager: EntityManager,
    ) {}

    async create(createMachineDto: CreateMachineDto) {
        const mach = new Machine(createMachineDto);
        await this.entityManager.save(mach);
        return 'New machine added';
    }

    async findAll() {
        return await this.machineRepo.find();
    }

    async findOne(id: number) {
        return await this.machineRepo.findOneBy({ id });
    }

    async update(id: number, updateMachineDto: UpdateMachineDto) {
        const mach = await this.machineRepo.findOneBy({ id });
        if (updateMachineDto.name) mach.name = updateMachineDto.name;
        if (updateMachineDto.vendor) mach.vendor = updateMachineDto.vendor;
        if (updateMachineDto.description) mach.description = updateMachineDto.description;
        if (updateMachineDto.status) mach.status = updateMachineDto.status;

        await this.entityManager.save(mach);

        return `Machine ${id} updated`;
    }

    async remove(id: number) {
        await this.machineRepo.delete({ id });
        return `Machine ${id} removed`;
    }
}
