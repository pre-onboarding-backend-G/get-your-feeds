import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { generateNoDashUUID } from 'src/common/util/uuid.util';

export enum SnsType {
  Facebook = 'facebook',
  Twitter = 'twitter',
  instagram = 'instagram',
  Threads = 'threads',
}

//TODO: enum, timestamp

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true, collection: 'articles' })
export class Article {
  @Prop({ type: String, default: generateNoDashUUID()})
  contentId: string;

  // enum
  @Prop()
  type: string;

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

  //timestamp
  // {default: now()}
  // @Prop()
  // createdAt: Date;

  // @Prop()
  // updatedAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

