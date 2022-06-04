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

import { CreateBankDto } from '../bank/dto/create-bank.dto';
import { CategoryService } from './category.service';
import { FilterCategoriesDto } from './dto/filter-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  private logger = new Logger('CategoryController');

  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(@Query() filterDto: FilterCategoriesDto) {
    this.logger.verbose(
      `You retrieving all banks. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.categoryService.getCategories(filterDto);
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateBankDto,
  ): Promise<CategoryEntity> {
    this.logger.verbose(
      `You creating a new Category. Data: ${JSON.stringify(createCategoryDto)}`,
    );
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }

  @Patch('/:id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
}
