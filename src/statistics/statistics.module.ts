import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import {
  ArticleStatistics,
  ArticleStatisticsSchema,
} from './schema/article-statistics.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleStatisticsModel } from './schema/article-statistics.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArticleStatistics.name, schema: ArticleStatisticsSchema },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService, ArticleStatisticsModel],
})
export class StatisticsModule {}
