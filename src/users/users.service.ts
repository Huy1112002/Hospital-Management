import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeLevelColumn } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/common/enums/role.enum';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,
    ) {}

    create(createUserDto: CreateUserDto) {
        return this.usersRepository.save(createUserDto);
    }

    createUser(createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOneById(user_id: string): Promise<any> {
        return await this.usersRepository.findOne({
            select: {
                user_id: true,
                user_name: true,
                date_of_birth: true,
                CID: true,
                isMale: true,
            },
            where: {
                user_id: user_id,
            },
        });
    }

    findOneByIdWithToken(user_id: string): Promise<User | null> {
        return this.usersRepository.createQueryBuilder('user').where('user.email = :user_id', { user_id }).addSelect('user.hasedRT').getOne();
    }

    findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }

    findOneByEmailWithPassword(email: string): Promise<User | null> {
        return this.usersRepository.createQueryBuilder('user').where('user.email = :email', { email }).addSelect('user.password').getOne();
    }

    findOneByCID(CID: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ CID });
    }

    findOneByPhone(phone: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ phone });
    }

    async queryUser(query: string, role: Role): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: [
                {
                    email: query,
                    role: role,
                },
                {
                    phone: query,
                    role: role,
                },
                {
                    CID: query,
                    role: role,
                },
            ],
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        await this.usersRepository.update(id, updateUserDto);
    }

    async updateRtHash(id: string, hasedRt: string) {
        await this.usersRepository.update(id, { hasedRt });
    }

    async remove(user_id: string): Promise<void> {
        await this.usersRepository.delete(user_id);
    }

    async getAllDoctor() {
        return await this.usersRepository.findBy({ role: Role.Doctor });
    }
    a;
    async getAllNurse() {
        return await this.usersRepository.findBy({ role: Role.Nurse });
    }
}
