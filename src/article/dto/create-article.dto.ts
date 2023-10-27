import { IsNumber, IsString, MaxLength } from 'class-validator';
import { SnsType } from '../schema/article.schema';


export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  type: string;
  
  @IsString()
  content: string;

  @MaxLength(20, {
    each: true,
  })
  hashtags: string[];

  @IsNumber()
  viewCount: number;

  @IsNumber()
  likeCount: number;
  
  @IsNumber()
  shareCount: number;
}
