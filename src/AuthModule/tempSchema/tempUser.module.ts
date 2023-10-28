import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TempUser, TempUserSchema } from './tempUser.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TempUser.name, schema: TempUserSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class TempUserModule {}
