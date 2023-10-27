import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatisticsDocument = HydratedDocument<Statistics>;

/**
 * @author 명석
 * @desc service 테스트 코드 작성을 위해 선언만 해두었습니다. 필드는 model 작업 시, 추가할 예정입니다.
 * @todo model 코드 작성 후 주석 삭제
 */
@Schema({ timestamps: true, collection: 'statistics' })
export class Statistics {}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);
