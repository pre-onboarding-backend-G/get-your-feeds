import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Article, ArticleDocument, SnsType } from './schema/article.schema';
import { GetArticleDetailResDto } from './dto/get-article-detail-res.dto';

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

  // 미종 Place

  async findOneByContentId(
    contentId: string
  ): Promise<GetArticleDetailResDto> {
    let ret: GetArticleDetailResDto;
    let foundArticle: ArticleDocument = await this.articleModel.findOne({
      contentId: contentId
    });
    if (foundArticle === null) {
      throw new NotFoundException(`Article not found.`);
    }
    // console.log(foundArticle);
    foundArticle.viewCount += 1;
    foundArticle = await foundArticle.save();
    ret = {
      contentId: foundArticle.contentId,
      title: foundArticle.title,
      type: foundArticle.type,
      content: foundArticle.content,
      hashtags: foundArticle.hashtags,
      viewCount: foundArticle.viewCount,
      likeCount: foundArticle.likeCount,
      shareCount: foundArticle.shareCount,
    };
    return ret;
  }

  async sendShareByContentId(
    contentId: string
  ): Promise<void> {
    let foundArticle: ArticleDocument = await this.articleModel.findOne({
      contentId: contentId
    });
    if (foundArticle === null) {
      throw new NotFoundException(`Article not found.`);
    }
    let endpontToReq: string 
      = "https://www." + foundArticle.type 
      + ".com/share/" + contentId;
    // NOTE : HTTP Module 이용해서 endpointToReq으로 호출하고 성공했다고 가정 (response status 200)
    endpontToReq;
    foundArticle.shareCount += 1;
    foundArticle = await foundArticle.save();
    return ;
  }
}
