import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BankEntity } from '../../bank/entities/bank.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { CostEnum } from '../types/cost.enum';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column()
  amount: number;

  @Column()
  valueType: CostEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BankEntity, (bank) => bank.transactions, { eager: true })
  bankName: BankEntity;

  @OneToMany(() => CategoryEntity, (category) => category.transactionsName)
  categories: CategoryEntity[];
}
