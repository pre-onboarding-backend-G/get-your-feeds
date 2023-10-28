import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TempUserDocument = TempUser & Document;

@Schema()
export class TempUser {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const TempUserSchema = SchemaFactory.createForClass(TempUser);
