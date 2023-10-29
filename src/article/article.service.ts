import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schema/article.schema';
import { getRandomInt } from '../common/util/random-int.util';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { GetArticleResDto } from './dto/get-article-res.dto';
import { Page } from '../common/page';
import { RequestPaginatedQueryDto } from './dto/get-article.dto';

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

  async getPaginatedArticleList(request: RequestPaginatedQueryDto): Promise<Page<GetArticleResDto>> {
    const { page, perPage, skip, type, hashtag } = request

    const [totalArticleCount, articles] = await Promise.all([
      this.queryBuilder(type, hashtag).countDocuments(),
      this.queryBuilder(type, hashtag)
        .skip(skip)
        .limit(perPage)
        .exec()
    ]);

    const articleDtos = articles.map((article) =>
      plainToClass(GetArticleResDto, article, { excludeExtraneousValues: true })
    );
    const totalPage = Math.ceil(totalArticleCount / perPage);

    return new Page<GetArticleResDto>(page, totalPage, articleDtos)
  }

  private queryBuilder(type: string, hashtag: string) {
    const queryBuilder = this.articleModel.find({})
    if (type) {
      queryBuilder.where('type').equals(type);
    }

    if (hashtag && hashtag.length > 0) {
      queryBuilder.where('hashtags').in([hashtag]);
    }
    return queryBuilder

  }

  async sendLikeByContentId(contentId: string): Promise<void> {
    const article = await this.articleModel.findOne({ contentId }).exec();
    if (!article) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }
    article.likeCount += 1;
    await article.save();
  }

  /***************************************************
   * DMZ
   ***************************************************/

  // 미종

  // findOne(id: number) {
  //   return `This action returns a #${id} article`;
  // }
}
