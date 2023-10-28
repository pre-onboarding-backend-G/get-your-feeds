import { UserSchema } from './schema/user.schema';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'User',
      useFactory: (connection) => connection.model('User', UserSchema),
      inject: [getConnectionToken()],
    },
  ],
})
export class UserModule {}
