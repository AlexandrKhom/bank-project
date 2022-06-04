import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { CostEnum } from '../types/cost.enum';

export class CreateTransactionDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  readonly bankNameId: number;

  @IsEnum(CostEnum)
  readonly valueType: CostEnum;
}
