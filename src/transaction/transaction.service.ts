import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,getRepository } from 'typeorm';

import { BankEntity } from '../bank/entities/bank.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { IQueryTransactionsResponse } from './types/i-query-transactions.response';

@Injectable()
export class TransactionService {
  private logger = new Logger('TransactionService');
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(BankEntity)
    private readonly bankRepo: Repository<BankEntity>,
  ) {}

  async getTransactions(
    filterDto: FilterTransactionsDto,
  ): Promise<IQueryTransactionsResponse> {
    const { search, offset, limit } = filterDto;
    const queryBuilder =
      getRepository(TransactionEntity).createQueryBuilder('transaction');
    queryBuilder.orderBy('transactions.createdAt', 'DESC');
    const transactionsCount = await queryBuilder.getCount();

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(transactions.title) LIKE LOWER(:search) OR LOWER(transactions.amount) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    if (limit) {
      queryBuilder.limit(limit);
    }
    if (offset) {
      queryBuilder.offset(offset);
    }

    try {
      const transactions = await queryBuilder.getMany();
      return { transactions, transactionsCount };
    } catch (error) {
      this.logger.error(
        `Failed to get transactions". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getTransactionById(id: number): Promise<TransactionEntity> {
    const found = await this.transactionRepo.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Transaction with ID "${id}" not found`);
    }
    return found;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const { title, amount, valueType, bankNameId } = createTransactionDto;

    const newTransaction = this.transactionRepo.create({
      amount,
      title,
      valueType,
    });

    const bank = await this.bankRepo.findOne(bankNameId);

    if (valueType === 'PROFITABLE') {
      const newBalance = await this.bankRepo.create({
        ...bank,
        balance: bank.balance + amount,
      });
      await this.bankRepo.save(newBalance);
    } else {
      const newBalance = await this.bankRepo.create({
        ...bank,
        balance: bank.balance - amount,
      });
      await this.bankRepo.save(newBalance);
    }

    await this.transactionRepo.save(newTransaction);
    return newTransaction;
  }

  async deleteTransaction(id: number): Promise<void> {
    const result = await this.transactionRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
