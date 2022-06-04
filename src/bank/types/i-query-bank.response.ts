import { BankEntity } from '../entities/bank.entity';

export interface IQueryBankResponse {
  banks: BankEntity[];
  banksCount: number;
}
