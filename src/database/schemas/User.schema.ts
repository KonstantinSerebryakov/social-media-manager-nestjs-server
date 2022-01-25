import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({ default: '' })
  uuid4: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: '' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
