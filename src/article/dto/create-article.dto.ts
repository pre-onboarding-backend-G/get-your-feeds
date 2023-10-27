import { SnsType } from "../schema/article.schema";

export class CreateArticleDto {
	readonly title: string;
	readonly type: string;
	readonly content: string;
	readonly hashtags: string[];
	readonly viewCount: number;
	readonly likeCount: number;
	readonly shareCount: number;
}
