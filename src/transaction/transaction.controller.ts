import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  private logger = new Logger('TransactionController');

  constructor(private transactionService: TransactionService) {}

  @Get()
  getBanks(@Query() filterDto: FilterTransactionsDto) {
    this.logger.verbose(
      `You retrieving all banks. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.transactionService.getTransactions(filterDto);
  }

  @Get('/:id')
  getBankById(@Param('id') id: number): Promise<TransactionEntity> {
    return this.transactionService.getTransactionById(id);
  }

  @Post()
  createBank(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    this.logger.verbose(
      `You creating a new bank. Data: ${JSON.stringify(createTransactionDto)}`,
    );
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Delete('/:id')
  deleteBank(@Param('id') id: number): Promise<void> {
    return this.transactionService.deleteTransaction(id);
  }
}
