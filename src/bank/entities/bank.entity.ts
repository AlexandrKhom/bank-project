import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TransactionEntity } from '../../transaction/entities/transaction.entity';

@Entity({ name: 'banks' })
export class BankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  balance: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @OneToMany(() => TransactionEntity, (transaction) => transaction.bankName)
  transactions: TransactionEntity[];
}
