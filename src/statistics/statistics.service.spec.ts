import { Test, TestingModule } from '@nestjs/testing';
import {
  GetArticleStatisticsQueryType,
  StatisticsService,
} from './statistics.service';
import {
  ArticleStatisticsPeriod,
  ArticleStatisticsValue,
} from './statistics.type';
import {
  ArticleStatisticsAggregateType,
  ArticleStatisticsModel,
} from './schema/article-statistics.model';
import { GetArticleStatisticsResDto } from './dto/get-article-statistics-res.dto';

/**
 * @author 명석
 * @desc 게시물 통계 서비스가 정상 작동하는지에 대한 unit test입니다.
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
      const mockDto: GetArticleStatisticsQueryType = {
        hashtags: ['test'],
        periodType: ArticleStatisticsPeriod.DATE,
        startDate: new Date('2023-10-01T00:00:00Z'),
        endDate: new Date('2023-10-27T00:23:59Z'),
        value: ArticleStatisticsValue.COUNT,
      };

      const articleStatisticsAggregate: ArticleStatisticsAggregateType[] = [
        {
          _id: { year: 2023, month: 10, day: 10 },
          count: 10,
        },
        {
          _id: { year: 2023, month: 10, day: 12 },
          count: 4,
        },
        {
          _id: { year: 2023, month: 10, day: 16 },
          count: 20,
        },
      ];

      const expectedResult = new GetArticleStatisticsResDto(
        articleStatisticsAggregate,
      );

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(articleStatisticsAggregate);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "일자별(date)" "게시물 조회 수(viewCount)" 요청 시, 일자별 게시물 조회 수 데이터를 리턴 ', async () => {
      const mockDto: GetArticleStatisticsQueryType = {
        hashtags: ['test'],
        periodType: ArticleStatisticsPeriod.DATE,
        startDate: new Date('2023-10-01T00:00:00Z'),
        endDate: new Date('2023-10-27T00:23:59Z'),
        value: ArticleStatisticsValue.VIEW_COUNT,
      };

      const articleStatisticsAggregate: ArticleStatisticsAggregateType[] = [
        {
          _id: { year: 2023, month: 10, day: 10 },
          viewCount: 200,
        },
        {
          _id: { year: 2023, month: 10, day: 12 },
          viewCount: 20,
        },
        {
          _id: { year: 2023, month: 10, day: 16 },
          viewCount: 120,
        },
      ];

      const expectedResult = new GetArticleStatisticsResDto(
        articleStatisticsAggregate,
      );

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(articleStatisticsAggregate);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "일자별(date)" "게시물 좋아요 수(likeCount)" 요청 시, 일자별 게시물 좋아요 수 데이터를 리턴', async () => {
      const mockDto: GetArticleStatisticsQueryType = {
        hashtags: ['test'],
        periodType: ArticleStatisticsPeriod.DATE,
        startDate: new Date('2023-10-01T00:00:00Z'),
        endDate: new Date('2023-10-27T00:23:59Z'),
        value: ArticleStatisticsValue.LIKE_COUNT,
      };

      const articleStatisticsAggregate: ArticleStatisticsAggregateType[] = [
        {
          _id: { year: 2023, month: 10, day: 10 },
          likeCount: 100,
        },
        {
          _id: { year: 2023, month: 10, day: 12 },
          likeCount: 10,
        },
        {
          _id: { year: 2023, month: 10, day: 16 },
          likeCount: 53,
        },
      ];

      const expectedResult = new GetArticleStatisticsResDto(
        articleStatisticsAggregate,
      );

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(articleStatisticsAggregate);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));

      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "일자별" "게시물 공유 수(shareCount)" 요청 시, 일자별 게시물 공유 수 데이터를 리턴', async () => {
      const mockDto: GetArticleStatisticsQueryType = {
        hashtags: ['test'],
        periodType: ArticleStatisticsPeriod.DATE,
        startDate: new Date('2023-10-01T00:00:00Z'),
        endDate: new Date('2023-10-27T00:23:59Z'),
        value: ArticleStatisticsValue.SHARE_COUNT,
      };

      const articleStatisticsAggregate: ArticleStatisticsAggregateType[] = [
        {
          _id: { year: 2023, month: 10, day: 10 },
          shareCount: 20,
        },
        {
          _id: { year: 2023, month: 10, day: 12 },
          shareCount: 2,
        },
        {
          _id: { year: 2023, month: 10, day: 16 },
          shareCount: 15,
        },
      ];

      const expectedResult = new GetArticleStatisticsResDto(
        articleStatisticsAggregate,
      );

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(articleStatisticsAggregate);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));

      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "시간별(hour)" "게시물 수(count)" 요청 시, 시간별 게시물 수 데이터를 리턴', async () => {
      const mockDto: GetArticleStatisticsQueryType = {
        hashtags: ['test'],
        periodType: ArticleStatisticsPeriod.HOUR,
        startDate: new Date('2023-10-01T00:00:00Z'),
        endDate: new Date('2023-10-27T00:00:00Z'),
        value: ArticleStatisticsValue.COUNT,
      };

      const articleStatisticsAggregate: ArticleStatisticsAggregateType[] = [
        {
          _id: { year: 2023, month: 10, day: 10, hour: 10 },
          count: 10,
        },
        {
          _id: { year: 2023, month: 10, day: 12, hour: 9 },
          count: 4,
        },
        {
          _id: { year: 2023, month: 10, day: 16, hour: 22 },
          count: 20,
        },
      ];

      const expectedResult = new GetArticleStatisticsResDto(
        articleStatisticsAggregate,
      );

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(articleStatisticsAggregate);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));

      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "시간별(hour)" "게시물 조회 수(viewCount)" 요청 시, 시간별 게시물 조회 수 데이터를 리턴 ', async () => {
      const mockDto: GetArticleStatisticsQueryType = {
        hashtags: ['test'],
        periodType: ArticleStatisticsPeriod.HOUR,
        startDate: new Date('2023-10-01T00:00:00Z'),
        endDate: new Date('2023-10-27T00:00:00Z'),
        value: ArticleStatisticsValue.VIEW_COUNT,
      };

      const articleStatisticsAggregate: ArticleStatisticsAggregateType[] = [
        {
          _id: { year: 2023, month: 10, day: 10, hour: 10 },
          viewCount: 200,
        },
        {
          _id: { year: 2023, month: 10, day: 12, hour: 9 },
          viewCount: 20,
        },
        {
          _id: { year: 2023, month: 10, day: 16, hour: 22 },
          viewCount: 120,
        },
      ];

      const expectedResult = new GetArticleStatisticsResDto(
        articleStatisticsAggregate,
      );

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(articleStatisticsAggregate);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));

      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "시간별(hour)" "게시물 좋아요 수(likeCount)" 요청 시, 시간별 게시물 좋아요 수 데이터를 리턴', async () => {
      const mockDto: GetArticleStatisticsQueryType = {
        hashtags: ['test'],
        periodType: ArticleStatisticsPeriod.HOUR,
        startDate: new Date('2023-10-01T00:00:00Z'),
        endDate: new Date('2023-10-27T00:00:00Z'),
        value: ArticleStatisticsValue.LIKE_COUNT,
      };

      const articleStatisticsAggregate: ArticleStatisticsAggregateType[] = [
        {
          _id: { year: 2023, month: 10, day: 10, hour: 10 },
          likeCount: 100,
        },
        {
          _id: { year: 2023, month: 10, day: 12, hour: 9 },
          likeCount: 10,
        },
        {
          _id: { year: 2023, month: 10, day: 16, hour: 22 },
          likeCount: 53,
        },
      ];

      const expectedResult = new GetArticleStatisticsResDto(
        articleStatisticsAggregate,
      );

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(articleStatisticsAggregate);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));

      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });

    it('SUCCESS: "시간별(hour)" "게시물 공유 수(shareCount)" 요청 시, 시간별 게시물 공유 수 데이터를 리턴', async () => {
      const mockDto: GetArticleStatisticsQueryType = {
        hashtags: ['test'],
        periodType: ArticleStatisticsPeriod.HOUR,
        startDate: new Date('2023-10-01T00:00:00Z'),
        endDate: new Date('2023-10-27T00:00:00Z'),
        value: ArticleStatisticsValue.SHARE_COUNT,
      };

      const articleStatisticsAggregate: ArticleStatisticsAggregateType[] = [
        {
          _id: { year: 2023, month: 10, day: 10, hour: 10 },
          shareCount: 20,
        },
        {
          _id: { year: 2023, month: 10, day: 12, hour: 9 },

          shareCount: 2,
        },
        {
          _id: { year: 2023, month: 10, day: 16, hour: 22 },

          shareCount: 15,
        },
      ];
      const expectedResult = new GetArticleStatisticsResDto(
        articleStatisticsAggregate,
      );

      jest
        .spyOn(articleStatisticsModel, 'getArticleStatistics')
        .mockResolvedValue(articleStatisticsAggregate);

      const result = await statisticsService.getArticleStatistics(mockDto);

      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));

      expect(articleStatisticsModel.getArticleStatistics).toHaveBeenCalledWith(
        mockDto,
      );
    });
  });
});
