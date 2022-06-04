import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankModule } from './bank/bank.module';
import { schemaValidConfig } from './configs/schema-valid.config';
import { TransactionModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';
import typeOrmConfig from './configs/type-orm.config';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: schemaValidConfig,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BankModule,
    TransactionModule,
    CategoryModule,
  ],
  providers: [AppService],
})
export class AppModule {}
