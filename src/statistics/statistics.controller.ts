import { User } from './../user/schema/user.schema';
import { GetUser } from './../auth/decorators/user.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Request, Response } from 'express';
import { GetArticleStatisticsDto } from './dto/get-article-statistics.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetArticleStatisticsResDto } from './dto/get-article-statistics-res.dto';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiOperation({
    summary: '게시물 통계 조회 api',
    description:
      '일정 기간 동안, 특정 해시태그를 가진 sns 게시물의 통계(게시물 수, 조회 수, 좋아요 수, 공유 된 횟수)를 1일 단위로 혹은 1시간 단위로 조회할 수 있는 기능입니다. 해시태그 값이 없으면 유저의 계정 태그를 default로 조회합니다.',
  })
  @ApiOkResponse({
    description:
      '요청 성공 시, 데이터가 존재하는지 여부(isExistData)와 세부 통계 데이터(data)를 반환합니다.',
    type: GetArticleStatisticsResDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/articles')
  async getArticleStatistics(
    @GetUser() user: User,
    @Query() dto: GetArticleStatisticsDto,
  ): Promise<GetArticleStatisticsResDto> {
    return await this.statisticsService.getArticleStatistics(
      dto.setDefaultHashtag(user).toObject(),
    );
  }

  /**
   * @authro 명석
   * @todo 데이터 입력 후 create 로직 삭제 예정
   */
  @Post('/articles')
  async createArticleStatistics(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.statisticsService.create(req.body);
    res.status(201).json(result);
  }
}
