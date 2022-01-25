import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserEntityDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  uuid4: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
