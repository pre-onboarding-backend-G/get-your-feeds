import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schema/article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  // Common

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }

  /***************************************************
   * DMZ
  ***************************************************/

  // 연규님 Place

  findAll() {
    return `This action returns all article`;
  }

  /***************************************************
   * DMZ
  ***************************************************/

  // 미종

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

}
