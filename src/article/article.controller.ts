import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticleResDto } from './dto/get-article-res.dto';
import { PageRequestDto } from 'src/common/dto/page-request.dto';
import { Page } from '../common/page';
import { GetArticleDto } from './dto/get-article.dto';

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
  async getArticleListByQuery(@Query() request: GetArticleDto): Promise<Page<GetArticleResDto>> {
    const articles = this.articleService.getArticleListByQuery(request)
    return ;
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
