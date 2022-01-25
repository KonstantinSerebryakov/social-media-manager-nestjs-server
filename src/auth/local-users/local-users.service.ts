import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from '../../database/dto/user-create.dto';
import { UserEntityDto } from '../../database/dto/user-entity.dto';
import { UsersDatabaseService } from '../../database/providers/users-database.service';

@Injectable()
export class LocalUsersService {
  constructor(private readonly usersDatabase: UsersDatabaseService) {}

  async createOne(createUserDto: UserCreateDto): Promise<string> {
    const result: string | null = await this.usersDatabase.createOne(
      createUserDto,
    );
    if (result) {
      return result;
    } else {
      throw new BadRequestException();
    }
  }

  async findOneByEmail(email: string): Promise<UserEntityDto> {
    const entity: UserEntityDto = await this.usersDatabase.findOneByEmail(
      email,
    );
    if (entity) {
      return entity;
    } else {
      throw new NotFoundException();
    }
  }

  async validatePassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashPassword);
  }

  async isUserExist(createUserDto: UserCreateDto): Promise<boolean> {
    const email: string = createUserDto.email;
    return this.usersDatabase.isUserExist(email);
  }

  async validateUser(userDto: UserCreateDto): Promise<string> {
    const email = userDto.email;
    const password = userDto.password;

    const user = await this.usersDatabase.findOneByEmail(email);
    if (user && !(await this.validatePassword(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user.uuid4;
  }
}
