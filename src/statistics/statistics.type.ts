export const ArticleStatisticsPeriod = {
  DATE: 'date',
  HOUR: 'hour',
} as const;

export type ArticleStatisticsPeriodType =
  (typeof ArticleStatisticsPeriod)[keyof typeof ArticleStatisticsPeriod];

export const ArticleStatisticsValue = {
  COUNT: 'count',
  VIEW_COUNT: 'viewCount',
  LIKE_COUNT: 'likeCount',
  SHARE_COUNT: 'shareCount',
};

export type ArticleStatisticsValueType =
  (typeof ArticleStatisticsValue)[keyof typeof ArticleStatisticsValue];
