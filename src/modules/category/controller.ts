import * as cacheKeys from "./cache-keys";

import { createQueryBuilder } from "typeorm";
import { Category } from "../../entity/category";

// *** Queries *** //
async function categories(cache) {
  const cacheCategories = await cache.get(cacheKeys.categories);
  if (!!cacheCategories) return JSON.parse(cacheCategories);

  const categories = await createQueryBuilder<Category>(Category, "category")
    .select(["category.id", "category.name", "category.slug"])
    .getMany();

  await cache.set(cacheKeys.categories, JSON.stringify(categories));
  return categories;
}

export {
  // *** Queries *** //
  categories,
  // ** Mutation ** //
};
