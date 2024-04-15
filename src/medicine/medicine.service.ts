import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Batch } from './entities/batch.entity';
import { CreateBatchDto } from './dto/create-batch.dto';

@Injectable()
export class MedicineService {
    constructor(@InjectRepository(Batch) private batchRepository: Repository<Batch>) {}
    create(createBatchDto: CreateBatchDto) {
        return this.batchRepository.save(createBatchDto);
    }

    // findAll(): Promise<User[]> {
    //     return this.usersRepository.find();
    // }

    // findOneById(user_id: string): Promise<User | null> {
    //     return this.usersRepository.findOneBy({ user_id });
    // }

    // findOneByIdWithToken(user_id: string): Promise<User | null> {
    //     return this.usersRepository
    //         .createQueryBuilder('user')
    //         .where('user.email = :user_id', { user_id })
    //         .addSelect('user.hasedRT')
    //         .getOne();
    // }
}
