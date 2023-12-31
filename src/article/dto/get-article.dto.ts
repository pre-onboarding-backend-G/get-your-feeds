import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsString } from 'class-validator';

export class RequestPaginatedQueryDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  type?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  hashtag?: string;

  constructor(
    type?: string,
    hashtag?: string,
    page?: number,
    perPage?: number,
  ) {
    this.type = type;
    this.hashtag = hashtag;
    this.page = page;
    this.perPage = perPage;
  }

  get skip(): number {
    return this.page <= 0 ? (this.page = 0) : (this.page - 1) * this.perPage;
  }

  validatePaginateQuery(): this {
    this.validatePage();
    this.validateTake();

    return this;
  }

  private validateTake(): void {
    this.perPage = this.perPage && this.perPage >= 1 ? this.perPage : 10;
  }

  private validatePage(): void {
    this.page = this.page && this.page >= 1 ? this.page : 1;
  }
}
