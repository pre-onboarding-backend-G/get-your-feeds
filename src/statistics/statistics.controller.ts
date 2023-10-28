import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Request, Response } from 'express';
import { GetArticleStatisticsDto } from './dto/get-article-statistics.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiOperation({
    summary: '게시물 통계 조회 api',
    description:
      '일정 기간 동안의 sns 게시물의 통계(게시물 수, 조회 수, 좋아요 수, 공유 된 횟수)를 1일 단위로 혹은 1시간 단위로 조회할 수 있는 기능입니다.',
    parameters: [{ name: 'hashtags', in: 'query', required: false }],
  })
  @ApiOkResponse({ description: '' })
  @Get('/articles')
  async getArticleStatistics(
    @Req() req: Request,
    @Query() dto: GetArticleStatisticsDto,
  ) {
    /**
     * @author 명석
     * @desc authGuard에서 주입해준 user의 accountTag를 넣기 위해 임시로 작성한 코드입니다.
     */
    const userAccountTag = '이명석';
    return await this.statisticsService.getArticleStatistics(
      dto.setDefaultHashtag(userAccountTag).toObject(),
    );
  }

  @Post('/articles')
  async createArticleStatistics(@Req() req: Request, @Res() res: Response) {
    console.log('req.body: ', req.body);
    const result = await this.statisticsService.create(req.body);
    res.status(201).json(result);
  }
}
