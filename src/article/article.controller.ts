import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { RequestPaginatedQueryDto } from './dto/get-article.dto';
import { GetArticleResDto } from './dto/get-article-res.dto';
import { Page } from '../common/page';
import { GetArticleDetailResDto } from './dto/get-article-detail-res.dto';
import { CreateArticleShareDto } from './dto/create-article-share.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
  /**
  * @author Yeon Kyu
  * @email suntail2002@naver.com
  * @create date 2023-10-28 13:44:24
  * @modify date 2023-10-28 13:44:24
  * @desc [description]
  */

  @Get()
  async getPaginatedList(
    @Query()
    request: RequestPaginatedQueryDto,
  ): Promise<Page<GetArticleResDto>> {
    return await this.articleService.getPaginatedArticleList(
      request.validatePaginateQuery()
    );
  }

  @Post()
  async createArticle(
    @Body() request: CreateArticleDto,
  ): Promise<string> {
    const reponse = await this.articleService.createArticle(request);
    return reponse.contentId;
  }

  @Get('likes/:contentId')
  async sendLikeByContentId(@Param('contentId') contentId: string): Promise<string> {
    await this.articleService.sendLikeByContentId(contentId)
    return contentId;
  }

  /***************************************************
   * DMZ
   ***************************************************/

  // 미종 Place

  @Get(':contentId')
  async findOne(
    @Param('contentId') contentId: string
  ): Promise<GetArticleDetailResDto> {
    return await this.articleService.findOneByContentId(contentId);
  }

  @Post('share')
  async sendShare(
    @Body() dto: CreateArticleShareDto
  ) {
    return await this.articleService.sendShareByContentId(dto.contentId);
  }
}
