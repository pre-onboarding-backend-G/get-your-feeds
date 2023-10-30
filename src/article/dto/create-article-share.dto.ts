import { IsString } from "class-validator";

export class CreateArticleShareDto {
	@IsString()
	contentId: string
}