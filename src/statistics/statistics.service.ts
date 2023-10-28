import { Injectable } from '@nestjs/common';
import {
  ArticleStatisticsPeriodType,
  ArticleStatisticsValueType,
} from './statistics.type';
import { ArticleStatisticsModel } from './schema/article-statistics.model';
import { GetArticleStatisticsResDto } from './dto/get-article-statistics-res.dto';

export type GetArticleStatisticsQueryType = {
  hashtags?: string[];
  periodType: ArticleStatisticsPeriodType;
  startDate: Date;
  endDate: Date;
  value: ArticleStatisticsValueType;
};

@Injectable()
export class StatisticsService {
  constructor(
    private readonly articleStatisticsModel: ArticleStatisticsModel,
  ) {}

  async getArticleStatistics(
    getArticleStatisticsQuery: GetArticleStatisticsQueryType,
  ) {
    return new GetArticleStatisticsResDto(
      await this.articleStatisticsModel.getArticleStatistics(
        getArticleStatisticsQuery,
      ),
    );
  }

  async create(body) {
    this.articleStatisticsModel.create(body);
  }
}
