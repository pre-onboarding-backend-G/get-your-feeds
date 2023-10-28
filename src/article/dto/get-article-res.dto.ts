import { Exclude, Expose, Type } from 'class-transformer';
import { SnsType } from '../schema/article.schema';

export class GetArticleResDto {
  @Expose()
  contentId: string;

  @Expose()
  type: SnsType;

  @Expose()
  title: string;

  @Exclude()
  content: string;

  @Expose()
  hashtags: string[];

  @Expose()
  viewCount: number;

  @Expose()
  likeCount: number;

  @Expose()
  shareCount: number;
}

class QueryOptions {
  $regex: string;
  $options: string;
}

class Title {
  @Type(() => QueryOptions)
  title: QueryOptions;
}

class Content {
  @Type(() => QueryOptions)
  content: QueryOptions;
}

export class GetArticleQueryResDto {
  hashtag?: string;

  type?: string;

  @Type(() => QueryOptions)
  title?: QueryOptions;

  @Type(() => QueryOptions)
  content?: QueryOptions;

  $or?: (Title | Content)[];
}