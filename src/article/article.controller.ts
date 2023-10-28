import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Common

  @Post()
  async create(@Body() request: CreateArticleDto): Promise<string> {
    await this.articleService.create(request);
    return 'success';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }

  /***************************************************
   * DMZ
   ***************************************************/

  // 연규님 Place

  @Get()
  async getArticleList(): Promise<void> { // GetArticleDto[]
    // return this.articleService.getArticleList();
  }

  @Get('/search')
  findArticleListByQueryParam( //ArticleQueryParamDto
    @Query() request:any ,
  ): Promise<void> { // GetArticleByQueryParamDto[]
    return this.articleService.findArticleListByQueryParam(request);
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
