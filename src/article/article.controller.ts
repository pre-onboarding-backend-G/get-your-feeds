import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { PageRequestDto } from '../common/dto/page-request.dto';
import { Page } from '../common/page';
import { GetArticleDto } from './dto/get-article.dto';
import { PaginationOptionsDto } from './dto/pagination-options.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  /***************************************************
   * DMZ
   ***************************************************/

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
    request: PageRequestDto,
  ) {
    return await this.articleService.getPaginatedArticleList(request.validatePaginateQuery());
  }

  @Post()
  async createArticle(
    @Body() request: CreateArticleDto,
  ): Promise<string> {
    const reponse = await this.articleService.createArticle(request);
    return reponse.contentId;
  }

  @Post()
  //TODO: uuid pipe
  sendLike(contentId: string) {
    //게시물 리턴
    return;
  }

  /***************************************************
   * DMZ
   ***************************************************/

  // 미종 Place

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  // @Post()
  // createShare() {
  //   return ;
  // }
}
