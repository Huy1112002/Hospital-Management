import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { UserRoles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UserRoles(Role.Admin)
    @ApiBearerAuth()
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
    }

    @UserRoles(Role.Admin)
    @ApiBearerAuth()
    @Get()
    findAll() {
      return this.usersService.findAll();
    }

    @ApiBearerAuth()
    @Get('profile')
    getProfile(@GetCurrentUserId() id: string) {
      try {
        this.usersService.findOneById(id);
      } catch (err: unknown) {
        throw err;
      }
    }

    @UserRoles(Role.Admin)
    @ApiBearerAuth()
    @Get('search')
    search(
      @Query('query') query: string,
      @Query('role') role: Role
    ) {
      var search = this.usersService.queryUser(query, role);
      return search;
    }

    @UserRoles(Role.Patient)
    @ApiBearerAuth()
    @Get('doctor')
    getAllDoctor() {
      return this.usersService.getAllDoctor();
    }

    @ApiBearerAuth()
    @Patch('/:id')
    update(
      @Param('id') user_id: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.update(user_id, updateUserDto)
    }
}