import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterCategoriesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  offset?: number;
}
