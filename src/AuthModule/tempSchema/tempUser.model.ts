import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';

export type TempUserDocument = TempUser & Document;

@Schema()
export class TempUser extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  getIdAsString(): string {
    return this._id.toHexString();
  }
}

export const TempUserSchema = SchemaFactory.createForClass(TempUser);
export const TempUserModel = model<TempUserDocument>(
  'TempUser',
  TempUserSchema,
);
