import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { generateNoDashUUID } from '../../common/util/uuid.util';

export enum SnsType {
  Facebook = 'facebook',
  Twitter = 'twitter',
  Instagram = 'instagram',
  Threads = 'threads',
}

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true, collection: 'articles' })
export class Article {
  @Prop({ type: 'String', default: () => generateNoDashUUID()})
  contentId: string;

  @Prop()
  type: SnsType;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  hashtags: [string];

  @Prop()
  viewCount: number;

  @Prop()
  likeCount: number;

  @Prop()
  shareCount: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);