import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './schema/article.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ArticleController', () => {
  let controller: ArticleController;

  const mockArticleService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
		ArticleService,
		{
		  provide: getModelToken(Article.name),
		  useValue: mockArticleService,
		}
	],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
