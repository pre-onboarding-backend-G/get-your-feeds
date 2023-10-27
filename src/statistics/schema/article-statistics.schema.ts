import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  ArticleSnsSchemaType,
  ArticleSnsType,
  MeasurementUnitByDate,
} from '../statistics.type';

export type ArticleStatisticsDocument = HydratedDocument<ArticleStatistics>;

@Schema({ timestamps: true })
export class ArticleStatistics {
  @Prop({ required: true, type: String })
  contentId: string;

  @Prop({ required: true, enum: ArticleSnsSchemaType })
  snsType: ArticleSnsType;

  @Prop({ required: true, type: [String] })
  hashtags: string[];

  @Prop({ required: true, type: [{ count: Number, measurementDate: Date }] })
  viewCountByDate: MeasurementUnitByDate[];

  @Prop({ required: true, type: [{ count: Number, measurementDate: Date }] })
  likeCountByDate: MeasurementUnitByDate[];

  @Prop({ required: true, type: [{ count: Number, measurementDate: Date }] })
  shareCountByDate: MeasurementUnitByDate[];

  @Prop({ required: true, type: Date })
  articleCreationDate: Date;
}

export const ArticleStatisticsSchema =
  SchemaFactory.createForClass(ArticleStatistics);
