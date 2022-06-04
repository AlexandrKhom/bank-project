import { TransactionEntity } from '../entities/transaction.entity';

export interface IQueryTransactionsResponse {
  transactions: TransactionEntity[];
  transactionsCount: number;
}
