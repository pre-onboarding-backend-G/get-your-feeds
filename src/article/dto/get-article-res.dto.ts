import { Exclude, Expose } from 'class-transformer';
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