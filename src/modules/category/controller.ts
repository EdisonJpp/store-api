import { Category } from "../../entity/category";
import { createQueryBuilder } from "typeorm";

import * as cacheKeys from "./cache-keys";

// *** Queries *** //
async function categories(cache) {
  const cacheCategories = await cache.get(cacheKeys.categories);
  if (!!cacheCategories) return JSON.parse(cacheCategories);

  const categories = await createQueryBuilder<Category>(Category, "category")
    .select(["category.id", "category.name"])
    .getMany();

  await cache.set(cacheKeys.categories, JSON.stringify(categories));
  return categories;
}

export {
  // *** Queries *** //
  categories,
  // ** Mutation ** //
};
