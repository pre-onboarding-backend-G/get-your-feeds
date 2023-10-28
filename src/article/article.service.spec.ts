import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { getModelToken } from '@nestjs/mongoose';
import { Article } from './schema/article.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ArticleService', () => {
  let articleService: ArticleService;
  let model: Model<Article>;

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
    model = module.get<Model<Article>>(getModelToken(Article.name));
  });

  it('should be defined', () => {
    expect(articleService).toBeDefined();
  });

  describe('findOneByContentId', () => {

    it('should find and return a article by contentId', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockArticle);

      const result = await articleService.findOneByContentId(mockArticle.contentId);

      expect(model.findOne).toHaveBeenCalledWith({
        contentId: mockArticle.contentId
      });
      expect(result).toEqual(mockArticleRes);
    })

    it('should throw NotFoundException if article is not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      await expect(articleService.findOneByContentId(mockArticle.contentId)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findOne).toHaveBeenCalledWith({
        contentId: mockArticle.contentId
      });
    })
  });

  describe('sendShareByContentId', () => {

    it('should find and share', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockArticle);

      const result = await articleService.sendShareByContentId(mockArticle.contentId);

      expect(model.findOne).toHaveBeenCalledWith({
        contentId: mockArticle.contentId
      });
      expect(result).toEqual(undefined);
    })

    it('should throw NotFoundException if article is not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      await expect(articleService.findOneByContentId(mockArticle.contentId)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findOne).toHaveBeenCalledWith({
        contentId: mockArticle.contentId
      });
    })
  });
});
