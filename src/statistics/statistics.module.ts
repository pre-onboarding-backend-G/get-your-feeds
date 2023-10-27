import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { Statistics, StatisticsSchema } from './schema/statistics.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsModel } from './schema/statistics.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Statistics.name, schema: StatisticsSchema },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsModel],
})
export class StatisticsModule {}
