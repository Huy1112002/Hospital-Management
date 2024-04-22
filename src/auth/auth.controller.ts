import { Body, Controller, Get, HttpCode, HttpStatus, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Public } from 'src/common/decorators/auth.decorator';
import { Tokens } from './types';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signin(@Body() SigninDto: SigninDto): Promise<{ user: User; tokens: Tokens }> {
        try {
            const result = await this.authService.signIn(SigninDto);
            return result;
        } catch (err: unknown) {
            throw err;
        }
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signup(@Body() CreateUserDto: CreateUserDto): Promise<{ user: User; tokens: Tokens }> {
        try {
            const result = await this.authService.signUp(CreateUserDto);
            return result;
        } catch (err: unknown) {
            throw err;
        }
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: string): Promise<any> {
        try {
            await this.authService.logout(userId);
            return { msg: 'Logout successfull!' };
        } catch (err: unknown) {
            throw err;
        }
    }

    @Public()
    @Post('forgot-password')
    forgot_password() {
        return 'this action forget password';
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    refresh_token(
        @GetCurrentUserId() userId: string,
        @Headers('refreshToken') refreshToken: string,
    ): Promise<Tokens> {
        try {
            return this.authService.refreshTokens(userId, refreshToken);
        } catch (err: unknown) {
            throw err;
        }
    }
}
