import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 99)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
