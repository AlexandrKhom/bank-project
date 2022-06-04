import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { FilterBankDto } from './dto/filter-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { BankEntity } from './entities/bank.entity';

@Controller('bank')
export class BankController {
  private logger = new Logger('BankController');

  constructor(private bankService: BankService) {}

  @Get()
  getBanks(@Query() filterDto: FilterBankDto) {
    this.logger.verbose(
      `You retrieving all banks. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.bankService.getBanks(filterDto);
  }

  @Get('/:id')
  getBankById(@Param('id') id: number): Promise<BankEntity> {
    return this.bankService.getBankById(id);
  }

  @Post()
  createBank(@Body() createBankDto: CreateBankDto): Promise<BankEntity> {
    this.logger.verbose(
      `You creating a new bank. Data: ${JSON.stringify(createBankDto)}`,
    );
    return this.bankService.createBank(createBankDto);
  }

  @Delete('/:id')
  deleteBank(@Param('id') id: number): Promise<void> {
    return this.bankService.deleteBank(id);
  }

  @Patch('/:id')
  updateBank(
    @Param('id') id: number,
    @Body() updateBankDto: UpdateBankDto,
  ): Promise<BankEntity> {
    return this.bankService.updateBank(id, updateBankDto);
  }
}
