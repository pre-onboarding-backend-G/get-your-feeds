export const QueryPeriod = {
  DATE: 'date',
  HOUR: 'hour',
} as const;

export type QueryPeriodType = (typeof QueryPeriod)[keyof typeof QueryPeriod];

export const QueryValue = {
  COUNT: 'count',
  VIEW_COUNT: 'viewCount',
  LIKE_COUNT: 'likeCount',
  SHARE_COUNT: 'shareCount',
};

export type QueryValueType = (typeof QueryValue)[keyof typeof QueryValue];
