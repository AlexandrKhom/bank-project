import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,getRepository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoriesDto } from './dto/filter-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { IQueryCategoriesResponse } from './types/i-query-categories.response';
import { CategoryController } from './category.controller';

@Injectable()
export class CategoryService {
  private logger = new Logger('CategoryService');
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  async getCategories(
    filterDto: FilterCategoriesDto,
  ): Promise<IQueryCategoriesResponse> {
    const { search, offset, limit } = filterDto;
    const queryBuilder =
      getRepository(CategoryEntity).createQueryBuilder('categories');
    queryBuilder.orderBy('categories.createdAt', 'DESC');
    const categoriesCount = await queryBuilder.getCount();

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(categories.name) LIKE LOWER(:search) OR LOWER(categories.description) LIKE LOWER(:search))',
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
      const categories = await queryBuilder.getMany();
      return { categories, categoriesCount };
    } catch (error) {
      this.logger.error(
        `Failed to get banks". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    const found = await this.categoryRepo.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Bank with ID "${id}" not found`);
    }
    return found;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const { name, description } = createCategoryDto;

    const newCategory = this.categoryRepo.create({
      description,
      name,
    });

    await this.categoryRepo.save(newCategory);
    return newCategory;
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.getCategoryById(id);
    Object.assign(category, updateCategoryDto);
    return this.categoryRepo.save(category);
  }
}
