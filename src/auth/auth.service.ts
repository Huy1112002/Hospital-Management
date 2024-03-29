import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload, Tokens } from './types';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
    private saltOrRounds = 10;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(SigninDto: SigninDto): Promise<{user: User, tokens: Tokens}> {
        const user = await this.usersService.findOneByEmailWithPassword(SigninDto.email);
        if (!user) throw new NotFoundException('User not found');

        const passwordValid = await bcrypt.compare(SigninDto.password, user.password);
        if (!passwordValid) throw new ForbiddenException('Access Denied');
        delete user.password;

        const tokens = await this.getTokens(user.user_id, user.email, user.role);
        await this.updateRtHash(user.user_id, tokens.refresh_token);
        return {user, tokens};
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, this.saltOrRounds);

        try {
            var newUser = await this.usersService.create(createUserDto);
        } catch (err: unknown) {
            throw new ForbiddenException('Credentials incorrect');
        }

        const tokens = await this.getTokens(newUser.user_id, newUser.email, newUser.role);
        await this.updateRtHash(newUser.user_id, tokens.refresh_token);
 
        return {user: newUser, tokens};
    }

    async logout(userId: string): Promise<boolean> {
        await this.updateRtHash(userId, null);
        return true;
    }

    async refreshTokens(userId: string, rt: string): Promise<Tokens> {
        const user = await this.usersService.findOneByIdWithToken(userId);
        if(!user || !user.hasedRt) throw new ForbiddenException('Access Denied');

        const check = await bcrypt.compare(rt, user.hasedRt);
        if(!check) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.user_id, user.email, user.role);
        await this.updateRtHash(user.user_id, tokens.refresh_token);

        return tokens;
    }

    async updateRtHash(userId: string, rt: string): Promise<void> {
        if(!rt) {
            await this.usersService.updateRtHash(userId, rt);
            return;
        }

        const hash = await bcrypt.hash(rt, this.saltOrRounds);
        await this.usersService.updateRtHash(userId, hash);
    }

    async getTokens(userId: string, email: string, role: Role): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
            role: role,
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: 'AT_SECRET',
                expiresIn: '1h',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: 'RT_SECRET',
                expiresIn: '90d',
            })
        ])

        return {
            access_token: at,
            refresh_token: rt,
        };
    }
}
