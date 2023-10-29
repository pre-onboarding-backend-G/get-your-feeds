import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsNumber } from 'class-validator';

export class PageRequestDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  constructor(
    page?: number,
    perPage?: number,
  ) {
    this.page = page;
    this.perPage = perPage;
  }

  get skip(): number {
    return this.page <= 0 ? (this.page = 0) : (this.page - 1) * this.perPage;
  }

  validatePaginateQuery() {
    this.validatePage();
    this.validateTake();

    return this;
  }

  private validateTake() {
    this.perPage = this.perPage && this.perPage >= 1 ? this.perPage : 10;
  }

  private validatePage() {
    this.page = this.page && this.page >= 1 ? this.page : 1;
  }
}
