export const ArticleStatisticsPeriod = {
  DATE: 'date',
  HOUR: 'hour',
} as const;

export const ArticleStatisticsPeriods = Object.freeze(
  Object.values(ArticleStatisticsPeriod),
);

export type ArticleStatisticsPeriodType =
  (typeof ArticleStatisticsPeriod)[keyof typeof ArticleStatisticsPeriod];

export const ArticleStatisticsValue = {
  COUNT: 'count',
  VIEW_COUNT: 'viewCount',
  LIKE_COUNT: 'likeCount',
  SHARE_COUNT: 'shareCount',
} as const;

export const ArticleStatisticsValues = Object.freeze(
  Object.values(ArticleStatisticsValue),
);

export type ArticleStatisticsValueType =
  (typeof ArticleStatisticsValue)[keyof typeof ArticleStatisticsValue];

export const ArticleSns = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  THREADS: 'threads',
} as const;

export type ArticleSnsType = (typeof ArticleSns)[keyof typeof ArticleSns];

/**
 * @author 명석
 * @desc ArticleStatistics의 snsType 필드의 enum 검사용 타입을 생성하는 즉시실행 함수입니다. 즉시실행 함수이므로 런타임에 한 번만 실행됩니다.
 */
export const ArticleSnsSchemaType = (() => {
  return Object.values(ArticleSns);
})();

export type MeasurementUnitByDate = { count: number; measurementDate: Date };
