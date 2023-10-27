import { Test, TestingModule } from '@nestjs/testing';
import { QueryType, StatisticsService } from './statistics.service';
import {
  ArticleStatisticsPeriod,
  ArticleStatisticsValue,
} from './statistics.type';
import { ArticleStatisticsModel } from './schema/article-statistics.model';

/**
 * @author 명석
 * @desc StatisticsModel 생성 전 임시로 사용하기 위해 임의의 mockModel 함수를 선언하여 사용합니다.
 */
describe('StatisticsService', () => {
  let statisticsService: StatisticsService;
  let articleStatisticsModel: ArticleStatisticsModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: ArticleStatisticsModel,
          useValue: {
            getArticleStatistics: jest.fn(),
          },
        },
      ],
    }).compile();

    statisticsService = module.get<StatisticsService>(StatisticsService);
    articleStatisticsModel = module.get(ArticleStatisticsModel);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(statisticsService).toBeDefined();
  });

  describe('getArticleStatistics', () => {
    it('SUCCESS: "일자별(date)" "게시물 수(count)" 요청 시, 일자별 게시물 수 데이터를 리턴', async () => {
      const mockDto: QueryType = {
        hashtag: '이명석',
        type: ArticleStatisticsPeriod.DATE,
        start: new Date('2023-10-01T00:00:00Z'),
        end: new Date('2023-10-27T00:23:59Z'),
        value: ArticleStatisticsValue.COUNT,
      };

      const expectedResult = [
        { createdAt: new Date('2023-10-01'), counts: 1 },
        { createdAt: new Date('2023-10-02'), counts: 2 },
        { createdAt: new Date('2023-10-03'), counts: 3 },
        { createdAt: new Date('2023-10-27'), counts: 4 },
      ];

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(expectedResult);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(result).toStrictEqual(expectedResult);
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "일자별(date)" "게시물 조회 수(viewCount)" 요청 시, 일자별 게시물 조회 수 데이터를 리턴 ', async () => {
      const mockDto: QueryType = {
        hashtag: '이명석',
        type: ArticleStatisticsPeriod.DATE,
        start: new Date('2023-10-01T00:00:00Z'),
        end: new Date('2023-10-27T00:23:59Z'),
        value: ArticleStatisticsValue.VIEW_COUNT,
      };

      const expectedResult = [
        { createdAt: new Date('2023-10-01'), counts: 1 },
        { createdAt: new Date('2023-10-02'), counts: 2 },
        { createdAt: new Date('2023-10-03'), counts: 3 },
        { createdAt: new Date('2023-10-27'), counts: 4 },
      ];

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(expectedResult);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(result).toStrictEqual(expectedResult);
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "일자별(date)" "게시물 좋아요 수(likeCount)" 요청 시, 일자별 게시물 좋아요 수 데이터를 리턴', async () => {
      const mockDto: QueryType = {
        hashtag: '이명석',
        type: ArticleStatisticsPeriod.DATE,
        start: new Date('2023-10-01T00:00:00Z'),
        end: new Date('2023-10-27T00:23:59Z'),
        value: ArticleStatisticsValue.LIKE_COUNT,
      };

      const expectedResult = [
        { createdAt: new Date('2023-10-01'), counts: 1 },
        { createdAt: new Date('2023-10-02'), counts: 2 },
        { createdAt: new Date('2023-10-03'), counts: 3 },
        { createdAt: new Date('2023-10-27'), counts: 4 },
      ];

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(expectedResult);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(result).toStrictEqual(expectedResult);
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "일자별" "게시물 공유 수(shareCount)" 요청 시, 일자별 게시물 공유 수 데이터를 리턴', async () => {
      const mockDto: QueryType = {
        hashtag: '이명석',
        type: ArticleStatisticsPeriod.DATE,
        start: new Date('2023-10-01T00:00:00Z'),
        end: new Date('2023-10-27T00:23:59Z'),
        value: ArticleStatisticsValue.SHARE_COUNT,
      };

      const expectedResult = [
        { createdAt: new Date('2023-10-01'), counts: 1 },
        { createdAt: new Date('2023-10-02'), counts: 2 },
        { createdAt: new Date('2023-10-03'), counts: 3 },
        { createdAt: new Date('2023-10-27'), counts: 4 },
      ];

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(expectedResult);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(result).toStrictEqual(expectedResult);
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "시간별(hour)" "게시물 수(count)" 요청 시, 시간별 게시물 수 데이터를 리턴', async () => {
      const mockDto: QueryType = {
        hashtag: '이명석',
        type: ArticleStatisticsPeriod.HOUR,
        start: new Date('2023-10-01T00:00:00Z'),
        end: new Date('2023-10-27T00:00:00Z'),
        value: ArticleStatisticsValue.COUNT,
      };

      const expectedResult = [
        { createdAt: new Date('2023-10-01T00:00:00Z'), counts: 1 },
        { createdAt: new Date('2023-10-02T00:00:00Z'), counts: 2 },
        { createdAt: new Date('2023-10-03T00:00:00Z'), counts: 3 },
        { createdAt: new Date('2023-10-27T00:00:00Z'), counts: 4 },
      ];

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(expectedResult);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(result).toStrictEqual(expectedResult);
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "시간별(hour)" "게시물 조회 수(viewCount)" 요청 시, 시간별 게시물 조회 수 데이터를 리턴 ', async () => {
      const mockDto: QueryType = {
        hashtag: '이명석',
        type: ArticleStatisticsPeriod.HOUR,
        start: new Date('2023-10-01T00:00:00Z'),
        end: new Date('2023-10-27T00:00:00Z'),
        value: ArticleStatisticsValue.VIEW_COUNT,
      };

      const expectedResult = [
        { createdAt: new Date('2023-10-01T00:00:00Z'), counts: 1 },
        { createdAt: new Date('2023-10-02T00:00:00Z'), counts: 2 },
        { createdAt: new Date('2023-10-03T00:00:00Z'), counts: 3 },
        { createdAt: new Date('2023-10-27T00:00:00Z'), counts: 4 },
      ];

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(expectedResult);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(result).toStrictEqual(expectedResult);
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "시간별(hour)" "게시물 좋아요 수(likeCount)" 요청 시, 시간별 게시물 좋아요 수 데이터를 리턴', async () => {
      const mockDto: QueryType = {
        hashtag: '이명석',
        type: ArticleStatisticsPeriod.HOUR,
        start: new Date('2023-10-01T00:00:00Z'),
        end: new Date('2023-10-27T00:00:00Z'),
        value: ArticleStatisticsValue.LIKE_COUNT,
      };

      const expectedResult = [
        { createdAt: new Date('2023-10-01T00:00:00Z'), counts: 1 },
        { createdAt: new Date('2023-10-02T00:00:00Z'), counts: 2 },
        { createdAt: new Date('2023-10-03T00:00:00Z'), counts: 3 },
        { createdAt: new Date('2023-10-27T00:00:00Z'), counts: 4 },
      ];

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(expectedResult);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(result).toStrictEqual(expectedResult);
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "시간별(hour)" "게시물 공유 수(shareCount)" 요청 시, 시간별 게시물 공유 수 데이터를 리턴', async () => {
      const mockDto: QueryType = {
        hashtag: '이명석',
        type: ArticleStatisticsPeriod.HOUR,
        start: new Date('2023-10-01T00:00:00Z'),
        end: new Date('2023-10-27T00:00:00Z'),
        value: ArticleStatisticsValue.SHARE_COUNT,
      };

      const expectedResult = [
        { createdAt: new Date('2023-10-01T00:00:00Z'), counts: 1 },
        { createdAt: new Date('2023-10-02T00:00:00Z'), counts: 2 },
        { createdAt: new Date('2023-10-03T00:00:00Z'), counts: 3 },
        { createdAt: new Date('2023-10-27T00:00:00Z'), counts: 4 },
      ];

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(expectedResult);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(result).toStrictEqual(expectedResult);
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });
  });
});
