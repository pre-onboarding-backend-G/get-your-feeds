import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Common

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    console.log(`createArticleDto: `)
    console.log(createArticleDto)
    return await this.articleService.create(createArticleDto);
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
  async findAll() {
    return await this.articleService.findAll();
  }

  // @Post()
  // createLike() {
  //   return ;
  // }

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
