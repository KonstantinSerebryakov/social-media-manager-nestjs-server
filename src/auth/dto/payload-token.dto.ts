import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PayloadTokenDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  userUUID: string;
}
