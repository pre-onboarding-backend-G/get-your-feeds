import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { Model } from 'mongoose';
import { Article, SnsType } from './schema/article.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { getRandomInt } from '../common/util/random-int.util';
import { NotFoundException } from '@nestjs/common';

describe('ArticleService', () => {
  let articleService: ArticleService;
  let articleModel: Model<Article>;

  const mockArticle = {
    _id: '653ca8b5e100a45aa521511e',
    contentId: '56ef756082cd4ddb9690af97ae5ef362',
    type: 'instagram',
    title: 'good title',
    content: 'great content',
    hashtags: [
        'nice'
    ],
    viewCount: 100,
    likeCount: 200,
    shareCount: 300,
    createdAt: '2023-10-28T06:22:45.862Z',
    updatedAt: '2023-10-28T06:22:45.862Z',
    __v: 0,
    save: jest.fn().mockImplementation(function() {
      return Promise.resolve(this);
    })

  }
  const mockArticleRes = {
    contentId: '56ef756082cd4ddb9690af97ae5ef362',
    type: 'instagram',
    title: 'good title',
    content: 'great content',
    hashtags: [
        'nice'
    ],
    viewCount: 101,
    likeCount: 200,
    shareCount: 300,
  }

  // const mockArticleService = {
  //   findOneByContentId: jest.fn()
  // };
  const mockArticleService = {
    findOne: jest.fn().mockResolvedValue(mockArticle), // Add this line
    findOneByContentId: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getModelToken(Article.name),
          useValue: mockArticleService,
        }
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
    articleModel = module.get<Model<Article>>(getModelToken('Article'));
  });

  /**
  * @author Yeon Kyu
  * @email suntail2002@naver.com
  * @create date 2023-10-28 13:19:42
  * @modify date 2023-10-28 13:19:42
  * @desc title, type, content, hashtags를 Body에 입력하고 생성하면 랜덤으로
  *       조회수, 좋아요수, 공유수가 만들어지는걸 확인하는 테스트.
  */
  describe('createArticle', () => {
    it('페이스북으로 피드를 생성 합니다.', async () => {
      const createArticleDto: CreateArticleDto = {
        title: 'TODO list',
        type: SnsType.Twitter,
        content: '- 테스트로직 작성, - 서비스 코드 작성, - swagger도 써야돼',
        hashtags: ['#TODO', '#오운완'],
      };

      const viewCount = getRandomInt(1, 100);
      const likeCount = getRandomInt(0, 100);
      const shareCount = getRandomInt(0, 100);

      const mockCreatedArticle = {
        ...createArticleDto,
        viewCount,
        likeCount,
        shareCount,
      };

      articleModel.create = jest.fn().mockResolvedValue(mockCreatedArticle);

      const createdArticle =
        await articleService.createArticle(createArticleDto);
      expect(createdArticle).toBeDefined()
      expect(createdArticle).toMatchObject(mockCreatedArticle);
    });
  })

  it('should be defined', () => {
    expect(articleService).toBeDefined();
  });

  describe('findOneByContentId', () => {

    it('should find and return a article by contentId', async () => {
      jest.spyOn(articleModel, 'findOne').mockResolvedValue(mockArticle);

      const result = await articleService.findOneByContentId(mockArticle.contentId);

      expect(articleModel.findOne).toHaveBeenCalledWith({
        contentId: mockArticle.contentId
      });
      expect(result).toEqual(mockArticleRes);
    })

    it('should throw NotFoundException if article is not found', async () => {
      jest.spyOn(articleModel, 'findOne').mockResolvedValue(null);

      await expect(articleService.findOneByContentId(mockArticle.contentId)).rejects.toThrow(
        NotFoundException,
      );

      expect(articleModel.findOne).toHaveBeenCalledWith({
        contentId: mockArticle.contentId
      });
    })
  });

  describe('sendShareByContentId', () => {

    it('should find and share', async () => {
      jest.spyOn(articleModel, 'findOne').mockResolvedValue(mockArticle);

      const result = await articleService.sendShareByContentId(mockArticle.contentId);

      expect(articleModel.findOne).toHaveBeenCalledWith({
        contentId: mockArticle.contentId
      });
      expect(result).toEqual(undefined);
    })

    it('should throw NotFoundException if article is not found', async () => {
      jest.spyOn(articleModel, 'findOne').mockResolvedValue(null);

      await expect(articleService.findOneByContentId(mockArticle.contentId)).rejects.toThrow(
        NotFoundException,
      );

      expect(articleModel.findOne).toHaveBeenCalledWith({
        contentId: mockArticle.contentId
      });
    })
  });
});
