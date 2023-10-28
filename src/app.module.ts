import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    // MongooseModule.forRoot(process.env.DATABASE_URI, {
    //   dbName: process.env.DATABASE_NAME,
    //   auth: {
    //     username: process.env.DATABASE_USER,
    //     password: process.env.DATABASE_PASS,
    //   },
    // }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
