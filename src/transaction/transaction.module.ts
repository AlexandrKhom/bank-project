import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionEntity } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { BankEntity } from '../bank/entities/bank.entity';

@Module({
  controllers: [TransactionController],
  imports: [TypeOrmModule.forFeature([TransactionEntity, BankEntity])],
  providers: [TransactionService],
})
export class TransactionModule {}
