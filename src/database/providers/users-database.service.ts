import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/User.schema';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserEntityDto } from '../dto/user-entity.dto';

@Injectable()
export class UsersDatabaseService {
  constructor(
    @InjectModel(User.name)
    private readonly lolKek: Model<UserDocument>,
  ) {}

  async isUserExist(email: string): Promise<boolean> {
    return await this.lolKek.exists({
      email: email,
    });
  }

  async createOne(userDto: UserCreateDto): Promise<string | null> {
    const email = userDto.email;
    const isExist = await this.isUserExist(email);
    if (isExist) {
      return null;
    } else {
      const document: UserDocument = await new this.lolKek(userDto).save();
      return document.uuid4;
    }
  }

  async findAll(): Promise<UserEntityDto[]> {
    const documents: UserDocument[] = await this.lolKek.find().exec();
    return documents.map((document) => {
      return <UserEntityDto>document;
    });
  }

  async findOneByUUID4(uuid4: string): Promise<UserEntityDto> {
    const document: UserDocument = await this.lolKek
      .findOne({
        uuid4: uuid4,
      })
      .exec();
    return <UserEntityDto>document;
  }

  async findOneByEmail(email: string): Promise<UserEntityDto | null> {
    const document: UserDocument = await this.lolKek
      .findOne({
        email: email,
      })
      .exec();
    return <UserEntityDto>document;
  }

  async removeOne(uuid: string): Promise<boolean> {
    const result = await this.lolKek.deleteOne({ uuid4: uuid }).exec();
    return result.deletedCount > 0;
  }

  // async updateOne(uuid: string, user: User) {
  //   const result = await this.UserModel.updateOne({ uuid: uuid }, user, {
  //     upsert: true,
  //   }).exec();
  //   return result.modifiedCount > 0;
  // }
}
