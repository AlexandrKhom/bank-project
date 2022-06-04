import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBankDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNumber()
  @Min(1, { message: 'wrong min balance' })
  @Max(99999, { message: 'wrong max balance' })
  @IsNotEmpty()
  readonly balance: number;
}
