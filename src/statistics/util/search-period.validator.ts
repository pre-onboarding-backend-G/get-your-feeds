import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GetArticleStatisticsDto } from '../dto/get-article-statistics.dto';
import { ArticleStatisticsPeriod } from '../statistics.type';

/**
 * @author 명석
 * @abstract getArticleStatistics dto에서 endDate 필드를 검증하는 validator입니다.
 * @desc endDate 필드는 periodType이 hour일 때, 조회 기간의 끝 "시간"이 되며, 최대 7일을 조회할 수 있습니다. periodType이 date일 때, 조회 기간의 끝 "일자"가 되며, 최대 30일을 조회할 수 있습니다. 따라서, startDate의 값과 endDate 값이 올바르게 query 되었는지를 검증하기 위해 구현하였습니다.
 */
@ValidatorConstraint()
export class SearchPeriodValidator implements ValidatorConstraintInterface {
  validate(
    values: Date | string,
    args?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const { startDate } = args.object as GetArticleStatisticsDto;
    const { periodType } = args.object as GetArticleStatisticsDto;

    const daysDiff =
      (new Date(values).getTime() - new Date(startDate).getTime()) /
      (24 * 60 * 60 * 1000);

    if (periodType === ArticleStatisticsPeriod.DATE) {
      return daysDiff <= 30;
    } else {
      return daysDiff <= 7;
    }
  }

  defaultMessage(args?: ValidationArguments): string {
    return `정해진 양식으로 ${args.property}을 보내주세요.`;
  }
}
