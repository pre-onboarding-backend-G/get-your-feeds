import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleStatisticsDocument = HydratedDocument<ArticleStatistics>;

@Schema({ timestamps: true, collection: 'statistics' })
export class ArticleStatistics {}

export const ArticleStatisticsSchema =
  SchemaFactory.createForClass(ArticleStatistics);
