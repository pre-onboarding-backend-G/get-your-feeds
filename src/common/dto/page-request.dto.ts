import { Transform } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class PageRequestDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => {
    const parsedValue = parseInt(value)
    if (isNaN(parsedValue) || parsedValue < 1) {
      return 1;
    }
    return parsedValue
  })
  page?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => {
    const parsedValue = parseInt(value)
    if (isNaN(parsedValue) || parsedValue < 10) {
      return 10;
    }
    return parsedValue
  })
  perPage?: number;
}
