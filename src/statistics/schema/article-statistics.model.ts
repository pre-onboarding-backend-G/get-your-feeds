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
import { GetArticleStatisticsQueryType } from '../statistics.service';

export interface ArticleStatisticsAggregateType {
  _id: { year: number; month: number; day: number; hour?: number };
  count?: number;
  likeCount?: number;
  viewCount?: number;
  shareCount?: number;
}

@Injectable()
export class ArticleStatisticsModel {
  constructor(
    @InjectModel(ArticleStatistics.name)
    private articleStatisticsModel: Model<ArticleStatisticsDocument>,
  ) {}

  async getArticleStatistics({
    hashtags,
    periodType,
    startDate,
    endDate,
    value,
  }: GetArticleStatisticsQueryType) {
    const aggregationPipeLine =
      value === ArticleStatisticsValue.COUNT
        ? [
            this.projectOperatorFactory(value),
            { $match: { hashtags: { $in: hashtags } } },
            this.groupOperatorFactory(periodType, value),
            this.matchOperatorFactory(periodType, startDate, endDate),
          ]
        : [
            this.projectOperatorFactory(value),
            { $match: { hashtags: { $in: hashtags } } },
            this.unwindOperatorFactory(value),
            this.groupOperatorFactory(periodType, value),
            this.matchOperatorFactory(periodType, startDate, endDate),
          ];

    return await this.articleStatisticsModel
      .aggregate<ArticleStatisticsAggregateType>(aggregationPipeLine)
      .sort('_id');
  }

  private projectOperatorFactory(value: ArticleStatisticsValueType) {
    const projectOperator = { $project: { hashtags: 1 } };

    switch (value) {
      case ArticleStatisticsValue.COUNT:
        projectOperator.$project['articleCreationDate'] = 1;
        break;

      case ArticleStatisticsValue.VIEW_COUNT:
        projectOperator.$project['viewCountByDate'] = 1;
        break;

      case ArticleStatisticsValue.LIKE_COUNT:
        projectOperator.$project['likeCountByDate'] = 1;
        break;
      case ArticleStatisticsValue.SHARE_COUNT:
        projectOperator.$project['shareCountByDate'] = 1;
        break;
    }
    return projectOperator;
  }

  private unwindOperatorFactory(value: ArticleStatisticsValueType) {
    switch (value) {
      case ArticleStatisticsValue.VIEW_COUNT:
        return {
          $unwind: '$viewCountByDate',
        };

      case ArticleStatisticsValue.LIKE_COUNT:
        return {
          $unwind: '$likeCountByDate',
        };
      case ArticleStatisticsValue.SHARE_COUNT:
        return {
          $unwind: '$shareCountByDate',
        };
    }
  }

  private groupOperatorFactory(
    periodType: ArticleStatisticsPeriodType,
    value: ArticleStatisticsValueType,
  ) {
    const groupOperator = {
      $group: {
        _id: this.periodTypeGroupFactory(value, periodType),
      },
    };

    switch (value) {
      case ArticleStatisticsValue.COUNT:
        groupOperator.$group['count'] = { $sum: 1 };
        break;

      case ArticleStatisticsValue.VIEW_COUNT:
        groupOperator.$group['viewCount'] = { $sum: '$viewCountByDate.count' };
        break;

      case ArticleStatisticsValue.LIKE_COUNT:
        groupOperator.$group['likeCount'] = { $sum: '$likeCountByDate.count' };
        break;

      case ArticleStatisticsValue.SHARE_COUNT:
        groupOperator.$group['shareCount'] = {
          $sum: '$shareCountByDate.count',
        };
        break;
    }

    return groupOperator;
  }

  private periodTypeGroupFactory(
    value: ArticleStatisticsValueType,
    periodType: ArticleStatisticsPeriodType,
  ) {
    let periodTypeCondition: object;

    if (periodType === ArticleStatisticsPeriod.DATE) {
      switch (value) {
        case ArticleStatisticsValue.COUNT:
          periodTypeCondition = {
            year: { $year: '$articleCreationDate' },
            month: { $month: '$articleCreationDate' },
            day: { $dayOfMonth: '$articleCreationDate' },
          };
          break;

        case ArticleStatisticsValue.VIEW_COUNT:
          periodTypeCondition = {
            year: { $year: '$viewCountByDate.measurementDate' },
            month: { $month: '$viewCountByDate.measurementDate' },
            day: { $dayOfMonth: '$viewCountByDate.measurementDate' },
          };
          break;

        case ArticleStatisticsValue.LIKE_COUNT:
          periodTypeCondition = {
            year: { $year: '$likeCountByDate.measurementDate' },
            month: { $month: '$likeCountByDate.measurementDate' },
            day: { $dayOfMonth: '$likeCountByDate.measurementDate' },
          };
          break;

        case ArticleStatisticsValue.SHARE_COUNT:
          periodTypeCondition = {
            year: { $year: '$shareCountByDate.measurementDate' },
            month: { $month: '$shareCountByDate.measurementDate' },
            day: { $dayOfMonth: '$shareCountByDate.measurementDate' },
          };
          break;
      }
    } else if (periodType === ArticleStatisticsPeriod.HOUR) {
      switch (value) {
        case ArticleStatisticsValue.COUNT:
          periodTypeCondition = {
            year: { $year: '$articleCreationDate' },
            month: { $month: '$articleCreationDate' },
            day: { $dayOfMonth: '$articleCreationDate' },
            hour: { $hour: '$articleCreationDate' },
          };
          break;

        case ArticleStatisticsValue.VIEW_COUNT:
          periodTypeCondition = {
            year: { $year: '$viewCountByDate.measurementDate' },
            month: { $month: '$viewCountByDate.measurementDate' },
            day: { $dayOfMonth: '$viewCountByDate.measurementDate' },
            hour: { $hour: '$viewCountByDate.measurementDate' },
          };
          break;

        case ArticleStatisticsValue.LIKE_COUNT:
          periodTypeCondition = {
            year: { $year: '$likeCountByDate.measurementDate' },
            month: { $month: '$likeCountByDate.measurementDate' },
            day: { $dayOfMonth: '$likeCountByDate.measurementDate' },
            hour: { $hour: '$likeCountByDate.measurementDate' },
          };
          break;

        case ArticleStatisticsValue.SHARE_COUNT:
          periodTypeCondition = {
            year: { $year: '$shareCountByDate.measurementDate' },
            month: { $month: '$shareCountByDate.measurementDate' },
            day: { $dayOfMonth: '$shareCountByDate.measurementDate' },
            hour: { $hour: '$shareCountByDate.measurementDate' },
          };
          break;
      }
    }
    return periodTypeCondition;
  }

  private matchOperatorFactory(
    periodType: ArticleStatisticsPeriodType,
    startDate: Date,
    endDate: Date,
  ) {
    const matchOperator = {
      $match: {},
    };

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1;
    const startDay = startDate.getDate();
    const startHour = startDate.getHours();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;
    const endDay = endDate.getDate();
    const endHour = endDate.getHours();

    switch (periodType) {
      case ArticleStatisticsPeriod.DATE:
        matchOperator.$match = {
          '_id.year': { $gte: startYear, $lte: endYear },
          '_id.month': { $gte: startMonth, $lte: endMonth },
          '_id.day': { $gte: startDay, $lte: endDay },
        };
        break;

      case ArticleStatisticsPeriod.HOUR:
        matchOperator.$match = {
          '_id.year': { $gte: startYear, $lte: endYear },
          '_id.month': { $gte: startMonth, $lte: endMonth },
          '_id.day': { $gte: startDay, $lte: endDay },
          '_id.hour': { $gte: startHour, $lte: endHour },
        };
        break;
    }

    return matchOperator;
  }

  async create(body: any[]) {
    const documents = body.map((v) => {
      const document = {
        contentId: v.contentId,
        hashtags: v.hashtags,
        snsType: v.snsType,
        articleCreationDate: v.articleCreationDate,
        viewCountByDate: v.viewCountByDate,
        likeCountByDate: v.likeCountByDate,
        shareCountByDate: v.shareCountByDate,
      };
      return document;
    });

    return await this.articleStatisticsModel.insertMany(documents, {});
  }
}
