import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { PageRequestDto } from "src/common/dto/page-request.dto";
import { SnsType } from "../schema/article.schema";

export class GetArticleDto extends PageRequestDto {
  @IsOptional()
  hashtag: string;

  @IsOptional()
  @IsEnum(SnsType)
  type: SnsType;

  @IsOptional()
  orderBy: string;

  @IsOptional()
  @IsString()
  searchBy: string;
  
  @IsOptional()
  @IsString()
  @Length(2, 10)
  search: string
}