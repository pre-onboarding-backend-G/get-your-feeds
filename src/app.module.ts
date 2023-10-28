import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validation';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
import { AuthModule } from './AuthModule/auth.module';
=======
import { UserModule } from './user/user.module';
>>>>>>> 1b8f4ab8b593ae7837812f540adf854bfbbc1ae8

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
      auth: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
      },
    }),
<<<<<<< HEAD
    AuthModule,
=======
    UserModule,
>>>>>>> 1b8f4ab8b593ae7837812f540adf854bfbbc1ae8
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
