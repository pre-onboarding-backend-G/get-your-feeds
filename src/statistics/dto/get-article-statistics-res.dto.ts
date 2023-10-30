import { Exclude, Expose } from 'class-transformer';
import { ArticleStatisticsAggregateType } from '../schema/article-statistics.model';
import { ApiProperty } from '@nestjs/swagger';
import { isNumber } from 'class-validator';

interface IGetArticleStatisticsData {
  date: string;
  count?: number;
  likeCount?: number;
  viewCount?: number;
  shareCount?: number;
}
export class GetArticleStatisticsResDto {
  @Exclude() private _isExistData: boolean;
  @Exclude() private _data: IGetArticleStatisticsData[];
  constructor(data: ArticleStatisticsAggregateType[]) {
    this.mapData(data);
  }

  @ApiProperty({
    description: '요청한 데이터의 값입니다.',
    example: [
      {
        date: '2023-09-15T00:00:00.000Z',
        likeCount: 8,
      },
      {
        date: '2023-09-15T08:00:00.000Z',
        likeCount: 1,
      },
      {
        date: '2023-09-15T12:00:00.000Z',
        likeCount: 2,
      },
    ],
  })
  @Expose()
  get data(): IGetArticleStatisticsData[] {
    return this._data;
  }

  @ApiProperty({
    description: '요청한 데이터가 존재하는지에 대한 값입니다.',
    example: true,
    type: Boolean,
  })
  @Expose()
  get isExistData(): boolean {
    return this.data.length > 0;
  }

  private mapData(data: ArticleStatisticsAggregateType[]) {
    this._data = data.map((args: ArticleStatisticsAggregateType) => {
      const date = this.toISOStringOf(args._id);

      const result: IGetArticleStatisticsData = {
        date,
        ...this.mapCount(args),
      };

      return result;
    });
  }

  /**
   * @author 명석
   * @todo Date 객체를 다루는 여러가지 메서드들은 별도의 Date를 다루는 VO로 제작하여 사용하는 것이 중복 코드를 줄이고 재사용성을 높일 수 있을 것 같다.
   */
  private toISOStringOf({
    year,
    month,
    day,
    hour,
  }: ArticleStatisticsAggregateType['_id']) {
    return isNumber(hour)
      ? this.toISODateTimeString(year, month, day, hour)
      : this.toISODateString(year, month, day);
  }

  private toISODateString(year: number, month: number, day: number) {
    return new Date(year, month - 1, day).toISOString().split('T')[0];
  }

  private toISODateTimeString(
    year: number,
    month: number,
    day: number,
    hour: number,
  ) {
    return new Date(year, month - 1, day, hour).toISOString();
  }

  private mapCount(args: ArticleStatisticsAggregateType) {
    return Object.fromEntries(
      Object.entries(args).filter(([key, value]) =>
        this.isCountProp(key, value),
      ),
    );
  }

  private isCountProp(key: string, value: unknown): boolean {
    return key !== '_id' && isNumber(value);
  }
}
