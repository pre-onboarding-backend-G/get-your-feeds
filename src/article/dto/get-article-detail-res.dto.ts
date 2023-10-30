import { SnsType } from '../schema/article.schema';

export class GetArticleDetailResDto {
  contentId: string;
  title: string;
  type: SnsType;
  content: string;
  hashtags: string[];
  viewCount: number;
  likeCount: number;
  shareCount: number;
}
