import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schema/article.schema';
import { getRandomInt } from '../common/util/random-int.util';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { GetArticleQueryResDto, GetArticleResDto } from './dto/get-article-res.dto';
import { Page } from '../common/page';
import { GetArticleDto } from './dto/get-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
  ) { }

  /**
  * @author Yeon Kyu
  * @email suntail2002@naver.com
  * @create date 2023-10-28 13:44:24
  * @modify date 2023-10-28 13:44:24
  * @desc [description]
  */
  async createArticle(request: CreateArticleDto): Promise<Article> {
    const viewCount = getRandomInt(1, 100);
    const likeCount = getRandomInt(0, 100);
    const shareCount = getRandomInt(0, 100);

    return await this.articleModel.create({
      ...request,
      viewCount,
      likeCount,
      shareCount
    });
  }

  async getArticleList(page: number, perPage: number): Promise<Page<GetArticleResDto>> {
    const startIndex = (page - 1) * perPage;

    const [totalArticleCount, articles] = await Promise.all([
      this.articleModel.countDocuments({}),
      this.articleModel
        .find({})
        .sort({ createdAt: 'desc' })
        .skip(startIndex)
        .limit(perPage)
        .exec()
    ]);

    const articleDtos = articles.map((article) =>
      plainToClass(GetArticleResDto, article, { excludeExtraneousValues: true })
    );
    const totalPage = Math.ceil(totalArticleCount / perPage);

    return new Page<GetArticleResDto>(page, totalPage, articleDtos)
  }

  async getArticleListByQuery(query: GetArticleDto): Promise<Page<GetArticleResDto>> {
    const { hashtag, type, orderBy, searchBy, search, page, perPage } = query;
    const mongoQuery: GetArticleQueryResDto = {};

    if (hashtag) {
      mongoQuery.hashtag = hashtag;
    }

    if (type) {
      mongoQuery.type = type;
    }

    const sort = orderBy || 'createdAt';
    const order = sort.startsWith('-') ? -1 : 1;

    if (searchBy && search) {
      if (searchBy === 'title') {
        mongoQuery.title = { $regex: search, $options: 'i' };
      } else if (searchBy === 'content') {
        mongoQuery.content = { $regex: search, $options: 'i' };
      } else if (searchBy === 'title,content') {
        // Search in both title and content
        mongoQuery.$or = [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ];
      }
    }

    const skip = (page - 1) * perPage;

    const [totalArticleCount, articles] = await Promise.all([
      this.articleModel.countDocuments({}),
      this.articleModel
        .find(mongoQuery)
        .sort({ [sort]: order })
        .skip(skip)
        .limit(perPage)
        .exec()
    ]);

    const totalPage = Math.ceil(totalArticleCount / perPage);

    const articleDtos = articles.map((article) =>
      plainToClass(GetArticleResDto, article, { excludeExtraneousValues: true })
    );

    return new Page<GetArticleResDto>(page, totalPage, articleDtos)
  }

  async sendLikeByContentId(contentId: string): Promise<void> {
    //TODO: contentID를 가져와서 게시물 타입에 따라 도메인으로 요청 보내기
    // 해당 게시물에 좋아요 + 1 추가해서 Article에 저장
    return;
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
