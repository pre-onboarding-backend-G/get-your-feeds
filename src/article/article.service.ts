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

  async create(request: CreateArticleDto): Promise<Article> {
    const res = new this.articleModel(request);
    return await res.save()
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
  
  async findArticleListByQueryParam(
    request: any //ArticleQueryParamDto,
  ): Promise<void> {
    return;
  }

  async getArticleList(): Promise<void> {
    return ;
  }

  async sendLikeByContentId(contentId: string): Promise<void> {
    //TODO: contentID를 가져와서 게시물 타입에 따라 도메인으로 요청 보내기
    // 해당 게시물에 좋아요 + 1 추가해서 Article에 저장
    return ;
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
