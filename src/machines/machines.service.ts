import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { EntityManager, Repository } from 'typeorm';
import { State } from '../common/enums/machine.enum';

@Injectable()
export class MachinesService {
    constructor(
        @InjectRepository(Machine)
        private readonly machineRepo: Repository<Machine>,
        private readonly entityManager: EntityManager,
    ) {}

    async create(createMachinedto: CreateMachineDto) {
        const mach = new Machine({
            ...createMachinedto,
        });
        await this.entityManager.save(mach);

        return 'Machine added';
    }

    async findAll() {
        return await this.machineRepo.find();
    }

    async findOne(id: number) {
        const mach = await this.machineRepo.findOne({
            where: { id: id },
        });

        return mach ? mach : { message: `Machine ${id} not found` };
    }

    async findbyState(state: State) {
        const arr = await this.machineRepo.findBy({
            status: state,
        });

        if (arr.length == 0) return { message: `No ${state} machines` };

        return arr;
    }

    async update(id: number, updateMachineDto: UpdateMachineDto) {
        const mach = await this.machineRepo.findOneBy({ id });

        if (!mach) return { message: `Machine ${id} not found` };

        if (updateMachineDto.name) mach.name = updateMachineDto.name;
        if (updateMachineDto.vendor) mach.vendor = updateMachineDto.vendor;
        if (updateMachineDto.description) mach.description = updateMachineDto.description;
        if (updateMachineDto.status) mach.status = updateMachineDto.status;

        await this.entityManager.save(mach);

        return { message: `Machine ${id} updated` };
    }

    async remove(id: number) {
        const mach = await this.machineRepo.findOne({
            where: { id: id },
        });

        if (!mach) return { message: `Machine ${id} not found` };

        await this.machineRepo.delete({ id });
        return { message: `Machine ${id} removed` };
    }
}
