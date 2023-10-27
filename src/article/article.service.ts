import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Article, SnsType } from './schema/article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: mongoose.Model<Article>,
  ) {}

  // Common

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const res = await this.articleModel.create(createArticleDto);
    return res;
    // return 'This action adds a new article';
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

  async findAll(): Promise<Article[]> {
    const articles = await this.articleModel.find();
    return articles;
  }
  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec스ㅐ);
  // }

  /***************************************************
   * DMZ
  ***************************************************/

  // 미종

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

}
