import { IsEnum, IsString, Length, MaxLength } from 'class-validator';
import { SnsType } from '../schema/article.schema';

export class CreateArticleDto {
  @IsString()
  @Length(2, 20)
  title: string;

  @IsEnum(SnsType)
  type: string;

  @IsString()
  content: string;

  @MaxLength(10, {
    each: true,
  })
  hashtags: string[];
}
