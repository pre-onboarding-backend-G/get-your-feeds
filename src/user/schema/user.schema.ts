import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
      userHashtag: {
        type: String,
        required: true,
      },
    },
  ])
  connectedServices: { service: string; userHashtag: string }[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index(
  {
    _id: 1,
    'connectedServices.service': 1,
    'connectedServices.userHashtag': 1,
  },
  { unique: true },
);
