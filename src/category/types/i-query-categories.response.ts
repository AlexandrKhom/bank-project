import { CategoryEntity } from '../entities/category.entity';

export interface IQueryCategoriesResponse {
  categories: CategoryEntity[];
  categoriesCount: number;
}
