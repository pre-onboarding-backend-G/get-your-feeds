import { InjectModel } from '@nestjs/mongoose';
import { Statistics, StatisticsDocument } from './statistics.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsModel {
  constructor(
    @InjectModel(Statistics.name)
    private statisticsModel: Model<StatisticsDocument>,
  ) {}

  /**
   * @author 명석
   * @desc StatisticsService 테스트 코드 작성을 위해 임의로 작성된 메서드입니다.
   * @todo model 메서드 작성 후 주석 삭제
   */
  async getArticleStatistics(
    args: unknown,
  ): Promise<{ createdAt: Date; counts: number }[]> {
    console.log('args: ', args);
    return [
      { createdAt: new Date('2023-10-01'), counts: 1 },
      { createdAt: new Date('2023-10-02'), counts: 2 },
      { createdAt: new Date('2023-10-03'), counts: 3 },
      { createdAt: new Date('2023-10-27'), counts: 4 },
    ];
  }
}
