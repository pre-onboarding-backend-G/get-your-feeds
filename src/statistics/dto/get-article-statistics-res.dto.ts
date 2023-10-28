import { Exclude, Expose } from 'class-transformer';

export class GetArticleStatisticsResDto {
  @Exclude() private _data: { date: Date; count: number }[];

  constructor(
    data: {
      _id: { year: number; month: number; day: number; hour?: number };
      count?: number;
      likeCount?: number;
      viewCount?: number;
      shareCount?: number;
    }[],
  ) {
    this._data = data.map((v) => {
      const date = new Date(v._id.year, v._id.month - 1, v._id.day, v._id.hour);
      return {
        date,
        count: v?.count,
        likeCount: v?.likeCount,
        viewCount: v.viewCount,
        shareCount: v.shareCount,
      };
    });
  }

  @Expose()
  get date() {
    return this._data;
  }
}
