import { ArticleStatisticsValues } from './../statistics.type';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArticleStatisticsPeriodType,
  ArticleStatisticsPeriods,
  ArticleStatisticsValueType,
} from '../statistics.type';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { GetArticleStatisticsQueryType } from '../statistics.service';
import { SearchPeriodValidator } from '../util/search-period.validator';

/**
 * @author 명석
 * @desc 게시물 통계 조회 요청에 사용되는 dto입니다.
 */
export class GetArticleStatisticsDto {
  @ApiProperty({
    description:
      '게시물 통계 검색을 희망하는 해시태그(string)입니다. 여러개의 해시태그를 검색하는 경우 공백(white space) 없이 컴마(,)로 구분합니다. 해시태그를 보내지 않는 경우, 유저의 계정태그(accountTag)로 검색됩니다.',
    example: '성수동,google',
    required: false,
  })
  @Expose()
  @Transform((hashtags) => hashtags.value.split(','))
  @IsOptional()
  @IsString({ each: true })
  hashtags?: string[];

  @ApiProperty({
    description:
      '게시물 통계 검색 시 설정하는 조회 기간 유형입니다. 1시간 단위 검색은 hour이며 1일 단위 검색은 date입니다.',
    example: 'date',
    enum: ArticleStatisticsPeriods,
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsIn(ArticleStatisticsPeriods)
  readonly periodType: ArticleStatisticsPeriodType;

  @ApiProperty({
    description:
      'periodType이 hour일 때, 조회 기간의 시작 "시간"이 되며, periodType이 date일 때, 조회 기간의 시작"일자"가 됩니다. periodType이 date일 경우 시작 일자의 시간은 생략할 수 있습니다.',
    example: '2023-10-16T00:00:00.000Z',
    required: true,
  })
  @Expose()
  @Transform(({ value }) => !!value && new Date(value))
  @IsNotEmpty()
  @IsDate()
  readonly startDate: Date;

  @ApiProperty({
    description:
      'periodType이 hour일 때, 조회 기간의 끝 "시간"이 되며, 최대 7일을 조회할 수 있습니다. periodType이 date일 때, 조회 기간의 끝 "일자"가 되며, 최대 30일을 조회할 수 있습니다. periodType이 date일 경우 끝 일자의 시간은 생략할 수 있습니다.',
    example: '2023-10-16T00:00:00.000Z',
    required: true,
  })
  @Expose()
  @Transform(({ value }) => !!value && new Date(value))
  @IsNotEmpty()
  @IsDate()
  @Validate(SearchPeriodValidator)
  readonly endDate: Date;

  @ApiProperty({
    description:
      '어떤 통계 지표를 검색 할 지 선택하는 값 입니다. 게시물 수(count), 게시물 조회수(viewCount), 게시물 좋아요 수(likeCount), 게시물 공유 수(shareCount)를 선택할 수 있습니다.',
    example: 'count',
    required: true,
    enum: ArticleStatisticsValues,
  })
  @Expose()
  @IsNotEmpty()
  @IsIn(ArticleStatisticsValues)
  readonly value: ArticleStatisticsValueType;

  constructor() {}

  /**
   * @author 명석
   * @param defaultHashtag dto의 hashtag 값이 없을 때 default로 넣어줄 accountTag입니다.
   * @returns this
   */
  setDefaultHashtag(defaultHashtag: string): this {
    if (this.isEmptyHashtags()) this.hashtags = [defaultHashtag];
    return this;
  }

  private isEmptyHashtags(): boolean {
    return this.hashtags[0] === '';
  }

  /**
   * @author 명석
   * @desc hashtag를 제외한 DTO의 필드는 모두 readonly로 불변처리 하였습니다. 그러나 object로 변환 시, readonly 속성이 깨지므로, Object.freeze를 사용해 readonly 객체로 반환하였습니다.
   */
  toObject(): GetArticleStatisticsQueryType {
    const query: Partial<GetArticleStatisticsQueryType> = {};

    return Object.freeze(Object.assign(query, this));
  }
}
