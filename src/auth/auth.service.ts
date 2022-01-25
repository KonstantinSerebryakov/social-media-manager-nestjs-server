import { Injectable } from '@nestjs/common';
import { LocalUsersService } from './local-users/local-users.service';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from '../database/dto/user-create.dto';
import { PayloadTokenDto } from './dto/payload-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private localUsers: LocalUsersService,
  ) {}

  async localLogin(userDto: UserCreateDto) {
    const uuid = await this.localUsers.validateUser(userDto);

    const payload: PayloadTokenDto = {
      userUUID: uuid,
    };

    return this.jwtService.sign(payload);
  }

  async localRegister(userDto: UserCreateDto) {
    const uuid = await this.localUsers.createOne(userDto);

    const payload: PayloadTokenDto = {
      userUUID: uuid,
    };

    return this.jwtService.sign(payload);
  }
}
