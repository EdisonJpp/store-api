import * as cacheKeys from './cache-keys';

import { createQueryBuilder } from 'typeorm';
import { Category } from '../../entity/category';

const categories = async (cache: any) => {
  const cacheCategories = await cache.get(cacheKeys.categories);
  if (!!cacheCategories) return JSON.parse(cacheCategories);

  const categories = await createQueryBuilder<Category>(Category, 'category')
      .select(['category.id', 'category.name', 'category.slug'])
      .getMany();

  await cache.set(cacheKeys.categories, JSON.stringify(categories));
  return categories;
};

const categoryBySlug = async (slug: string, cache: any) => {
  const key = cacheKeys.categoryBySlug.replace(':slug', slug);
  const cacheCategory = await cache.get(key);
  if (!!cacheCategory) return JSON.parse(cacheCategory);

  const category = await createQueryBuilder<Category>(Category, 'category')
      .select([
        'category.id',
        'category.name',
        'category.slug',
        'children.id',
        'children.name',
        'children.slug',
      ])
      .leftJoin(
          'category.children',
          'children',
          'children.parentId = category.id',
      ).where('category.slug = :slug', { slug })
      .getOne();

  await cache.set(key, JSON.stringify(category));
  return category;
};

export {
  // *** Queries *** //
  categories,
  categoryBySlug,
  // ** Mutation ** //
};
