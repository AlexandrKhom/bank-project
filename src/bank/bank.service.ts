import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { CreateBankDto } from './dto/create-bank.dto';
import { FilterBankDto } from './dto/filter-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { BankEntity } from './entities/bank.entity';
import { IQueryBankResponse } from './types/i-query-bank.response';

@Injectable()
export class BankService {
  private logger = new Logger('BankService');
  constructor(
    @InjectRepository(BankEntity)
    private readonly bankRepo: Repository<BankEntity>,
  ) {}

  async getBanks(filterDto: FilterBankDto): Promise<IQueryBankResponse> {
    const { search, offset, limit } = filterDto;
    const queryBuilder = getRepository(BankEntity).createQueryBuilder('banks');
    queryBuilder.orderBy('banks.createdAt', 'DESC');
    const banksCount = await queryBuilder.getCount();

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(bank.name) LIKE LOWER(:search) OR LOWER(bank.description) LIKE LOWER(:search))',
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
      const banks = await queryBuilder.getMany();
      return { banks, banksCount };
    } catch (error) {
      this.logger.error(
        `Failed to get banks". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getBankById(id: number): Promise<BankEntity> {
    const found = await this.bankRepo.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Bank with ID "${id}" not found`);
    }
    return found;
  }

  async createBank(createBankDto: CreateBankDto): Promise<BankEntity> {
    const { name, description } = createBankDto;

    const newBank = this.bankRepo.create({
      description,
      name,
    });

    await this.bankRepo.save(newBank);
    return newBank;
  }

  async deleteBank(id: number): Promise<void> {
    const result = await this.bankRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateBank(
    id: number,
    updateBankDto: UpdateBankDto,
  ): Promise<BankEntity> {
    const bank = await this.getBankById(id);
    Object.assign(bank, updateBankDto);
    return this.bankRepo.save(bank);
  }
}
