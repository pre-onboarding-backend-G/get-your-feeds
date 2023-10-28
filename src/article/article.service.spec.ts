import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { getModelToken } from '@nestjs/mongoose';
import { Article } from './schema/article.schema';
import { Model } from 'mongoose';

describe('ArticleService', () => {
  let articleService: ArticleService;
  let model: Model<Article>;

  const mockArticleService = {};

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
});
