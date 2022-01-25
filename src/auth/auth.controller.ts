import { Controller, Post, Body, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from '../database/dto/user-create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userLocalDto: UserCreateDto) {
    return { token: await this.authService.localRegister(userLocalDto) };
  }

  @Post('login')
  async login(@Body() userLocalDto: UserCreateDto) {
    return { token: await this.authService.localLogin(userLocalDto) };
  }
}
