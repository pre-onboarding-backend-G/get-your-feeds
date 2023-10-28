import { Injectable } from '@nestjs/common';
import {
  ArticleStatisticsPeriodType,
  ArticleStatisticsValueType,
} from './statistics.type';
import { ArticleStatisticsModel } from './schema/article-statistics.model';

/**
 * @author 명석
 * @desc dto 작성 전, dto 대신 활용하기 위한 타입입니다.
 * @todo dto 작성 이후 삭제
 */
export type QueryType = {
  hashtag: string[];
  periodType: ArticleStatisticsPeriodType;
  start: Date;
  end: Date;
  value: ArticleStatisticsValueType;
};

@Injectable()
export class StatisticsService {
  constructor(
    private readonly articleStatisticsModel: ArticleStatisticsModel,
  ) {}

  async getArticleStatistics(dto: QueryType) {
    //todo dto의 hashtag 값이 있는지 검증하는 dto 메서드 추가
    //todo dto에 hashtag가 없을 경우 accountTag를 hashtag의 값으로 추가하는 메서드 추가
    const data = await this.articleStatisticsModel.getArticleStatistics(
      dto as any,
    );

    return data;
  }
}
