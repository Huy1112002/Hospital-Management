import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/auth.decorator';
// import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    // private readonly authService: AuthService
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return "Hello World";
  }
}
