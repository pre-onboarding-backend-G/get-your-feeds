import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop([
    {
      service: {
        type: String,
        enum: ['twitter', 'facebook', 'instagram', 'thread'],
        required: true,
      },
      accountTag: {
        type: String,
        required: true,
      },
    },
  ])
  connectedServices: { service: string; accountTag: string }[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index(
  { _id: 1, 'connectedServices.service': 1, 'connectedServices.accountTag': 1 },
  { unique: true },
);
