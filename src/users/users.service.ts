import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(user_id: string): Promise<User | null> {
    console.log(user_id);
    return this.usersRepository.findOneBy({ user_id: user_id });
  }

  findOneByIdWithToken(user_id: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :user_id', {user_id})
      .addSelect('user.hasedRT')
      .getOne();
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {email})
      .addSelect('user.password')
      .getOne();
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
          email: query ,
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
    return await this.usersRepository.findBy({role: Role.Doctor})
  }
a
  async getAllNurse() {
    return await this.usersRepository.findBy({role: Role.Nurse})
  }
}
