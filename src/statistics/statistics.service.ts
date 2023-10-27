import { Injectable } from '@nestjs/common';
import { QueryPeriodType, QueryValueType } from './statistics.type';
import { StatisticsModel } from './schema/statistics.model';

/**
 * @author 명석
 * @desc dto 작성 전, dto 대신 활용하기 위한 타입입니다.
 * @todo dto 작성 이후 삭제
 */
export type QueryType = {
  hashtag: string | string[];
  type: QueryPeriodType;
  start: Date;
  end: Date;
  value: QueryValueType;
};

@Injectable()
export class StatisticsService {
  constructor(private readonly statisticsModel: StatisticsModel) {}

  async getArticleStatistics(dto: QueryType) {
    //todo dto의 hashtag 값이 있는지 검증하는 dto 메서드 추가
    //todo dto에 hashtag가 없을 경우 accountTag를 hashtag의 값으로 추가하는 메서드 추가
    const data = await this.statisticsModel.getArticleStatistics(dto as any);

    return data;
  }
}
