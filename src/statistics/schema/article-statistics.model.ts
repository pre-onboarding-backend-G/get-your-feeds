import {
  ArticleStatisticsPeriod,
  ArticleStatisticsPeriodType,
  ArticleStatisticsValue,
  ArticleStatisticsValueType,
} from './../statistics.type';
import { InjectModel } from '@nestjs/mongoose';
import {
  ArticleStatistics,
  ArticleStatisticsDocument,
} from './article-statistics.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { QueryType } from '../statistics.service';

@Injectable()
export class ArticleStatisticsModel {
  constructor(
    @InjectModel(ArticleStatistics.name)
    private articleStatisticsModel: Model<ArticleStatisticsDocument>,
  ) {}

  /**
   * @author 명석
   * @desc 응답 DTO가 가져갈 책임이 있다면 위임할 예정입니다.
   * @todo 응답 DTO 작성 후 주석 삭제
   */
  async getArticleStatistics(args: QueryType) {
    const { hashtag, periodType, start, end, value } = args;
    const result = await this.articleStatisticsModel
      .aggregate()
      .match(this.matchOperatorFactory(hashtag, value, start, end))
      .group(this.groupOperatorFactory(periodType, value));

    return result;
  }

  private groupOperatorFactory(
    periodType: ArticleStatisticsPeriodType,
    value: ArticleStatisticsValueType,
  ) {
    const groupOperator = {
      _id: this.periodTypeGroupFactory(value, periodType),
    };

    switch (value) {
      case ArticleStatisticsValue.COUNT:
        groupOperator['count'] = { $sum: 1 };
        break;

      case ArticleStatisticsValue.VIEW_COUNT:
        groupOperator['viewCount'] = { $sum: '$viewCountByDate.count' };
        break;

      case ArticleStatisticsValue.LIKE_COUNT:
        groupOperator['likeCount'] = { $sum: '$likeCountByDate.count' };
        break;

      case ArticleStatisticsValue.SHARE_COUNT:
        groupOperator['shareCount'] = { $sum: '$shareCountByDate.count' };
        break;
    }

    return groupOperator;
  }

  private periodTypeGroupFactory(
    value: ArticleStatisticsValueType,
    periodType: ArticleStatisticsPeriodType,
  ) {
    let periodTypeCondition: object;

    if (value === ArticleStatisticsValue.COUNT) {
      switch (periodType) {
        case ArticleStatisticsPeriod.DATE:
          periodTypeCondition = {
            year: { $year: '$articleCreationDate' },
            month: { $month: '$articleCreationDate' },
            date: { $date: '$articleCreationDate' },
          };
          break;

        case ArticleStatisticsPeriod.HOUR:
          periodTypeCondition = {
            year: { $year: '$articleCreationDate' },
            month: { $month: '$articleCreationDate' },
            date: { $date: '$articleCreationDate' },
            hour: { $hour: '$articleCreationDate' },
          };
          break;
      }
    } else {
      switch (periodType) {
        case ArticleStatisticsPeriod.DATE:
          periodTypeCondition = {
            year: { $year: '$measurementDate' },
            month: { $month: '$measurementDate' },
            date: { $date: '$measurementDate' },
          };
          break;

        case ArticleStatisticsPeriod.HOUR:
          periodTypeCondition = {
            year: { $year: '$measurementDate' },
            month: { $month: '$measurementDate' },
            date: { $date: '$measurementDate' },
            hour: { $hour: '$measurementDate' },
          };
          break;
      }
    }

    return periodTypeCondition;
  }

  private matchOperatorFactory(
    hashtag: string[],
    value: ArticleStatisticsValueType,
    start: Date,
    end: Date,
  ) {
    const matchOperator = {
      $and: [
        {
          hashtags: { $in: [...hashtag] },
        },
      ],
    };

    matchOperator.$and.push(
      ...this.measurementDateConditionFactory(value, start, end),
    );
    return matchOperator;
  }

  private measurementDateConditionFactory(
    value: ArticleStatisticsValueType,
    start: Date,
    end: Date,
  ) {
    const measurementDateCondition = [];

    switch (value) {
      case ArticleStatisticsValue.COUNT:
        measurementDateCondition.push({
          articleCreationDate: { $gte: start, $lt: end },
        });
        break;

      case ArticleStatisticsValue.VIEW_COUNT:
        measurementDateCondition.push({
          viewCountByDate: {
            measurementDate: {
              $gte: start,
              $lt: end,
            },
          },
        });
        break;

      case ArticleStatisticsValue.LIKE_COUNT:
        measurementDateCondition.push({
          likeCountByDate: {
            measurementDate: {
              $gte: start,
              $lt: end,
            },
          },
        });
        break;

      case ArticleStatisticsValue.SHARE_COUNT:
        measurementDateCondition.push({
          shareCountByDate: {
            measurementDate: {
              $gte: start,
              $lt: end,
            },
          },
        });
        break;
    }

    return measurementDateCondition;
  }
}
