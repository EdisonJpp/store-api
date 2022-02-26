import { createQueryBuilder, getRepository } from "typeorm";
import { CategoryChild } from "../../entity/category-child";

import * as cacheKeys from "./cache-keys";

// *** Queries *** //
async function categoriesChildByParent(categoryParentId: number, cache) {
  const key = cacheKeys.categoriesChildByParent.replace(
    ":parentId",
    categoryParentId + ""
  );
  const cacheCategoriesChildByParent = await cache.get(key);

  if (!!cacheCategoriesChildByParent) {
    return JSON.parse(cacheCategoriesChildByParent);
  }

  const categoriesChild = await createQueryBuilder<CategoryChild>(
    CategoryChild,
    "categoryChild"
  )
    .select(["categoryChild.id", "categoryChild.name"])
    .where("categoryChild.parentId = :categoryParentId", {
      categoryParentId,
    })
    .getMany();

  await cache.set(key, JSON.stringify(categoriesChild));
  return categoriesChild;
}

async function categoryChild(categoryChildId: number, cache) {
  const cacheKey = cacheKeys.categoryChild.replace(":id", `${categoryChildId}`);

  const cacheCategoryChild = await cache.get(cacheKey);
  if (!!cacheCategoryChild) return JSON.parse(cacheCategoryChild);

  const child = await createQueryBuilder<CategoryChild>(
    CategoryChild,
    "categoryChild"
  )
    .select([
      "categoryChild.id",
      "categoryChild.name",
      "params.id",
      "categoryParams.id",
      "categoryParams.name",
      "categoryParams.options",
    ])
    .leftJoin("categoryChild.params", "params")
    .leftJoin("params.param", "categoryParams")
    .where("categoryChild.id = :categoryChildId", { categoryChildId })
    .getOne();

  await cache.set(cacheKey, JSON.stringify(child));
  return child;
}

// *** Mutations *** //
const saveCategoryChild = async (data: CategoryChild, cache) => {
  const repo = getRepository(CategoryChild);
  const saved = await repo.save(repo.create(data));

  const key = cacheKeys.categoriesChildByParent.replace(
    ":parentId",
    data.parentId + ""
  );

  let merged = [];
  const all = JSON.parse((await cache.get(key)) || "[]");

  if (!data.id) merged = [...all, saved];
  if (data.id) {
    merged = [...all.filter((it) => it.id !== data.id), saved];
  }

  cache.set(key, JSON.stringify(merged));
  return saved;
};

const removeCategoryChild = async (id: number, cache) => {
  const repo = getRepository(CategoryChild);
  const found = await repo.findOne(id);

  if (!found) throw Error("Not found");
  await repo.delete(found.id);

  const key = cacheKeys.categoriesChildByParent.replace(
    ":parentId",
    found.parentId + ""
  );

  const all = JSON.parse((await cache.get(key)) || "[]");
  const filtered = [...all.filter((it) => it.id !== found.id)];
  cache.set(key, JSON.stringify(filtered));

  return found;
};

export {
  categoriesChildByParent,
  categoryChild,
  // ** Mutation ** //
  saveCategoryChild,
  removeCategoryChild,
};