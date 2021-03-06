import { createQueryBuilder, getRepository } from 'typeorm';
import { CategoryChild } from '../../entity/category-child';

import * as cacheKeys from './cache-keys';

/**
 * get categoryChild by slug and set in cache.
 * @param {string} slug .
 * @param {any} cache cache client.
 * @return {CategoryChild} categoryChild.
 */
async function categoryChildBySlug(slug: string, cache) {
  const cacheKey = cacheKeys.categoryChildBySlug.replace(':slug', slug);
  const cacheCategoryChild = await cache.get(cacheKey);
  if (!!cacheCategoryChild) return JSON.parse(cacheCategoryChild);

  const child = await createQueryBuilder<CategoryChild>(
      CategoryChild,
      'categoryChild',
  )
      .select([
        'categoryChild.id',
        'categoryChild.name',
        'categoryParam.id',
        'param.parameterType',
        'param.id',
        'param.name',
        'param.options',
      ])
      .leftJoin('categoryChild.params', 'categoryParam')
      .leftJoin('categoryParam.param', 'param')
      .where('categoryChild.slug = :slug', { slug })
      .getOne();

  await cache.set(cacheKey, JSON.stringify(child));
  return child;
}

/**
 * save categoryChild and update cache
 * @param {CategoryChild} data categoryChild.
 * @param {any} cache cache client.
 * @return {CategoryChild} categoryChild.
 */
async function saveCategoryChild(data: CategoryChild, cache) {
  const repo = getRepository(CategoryChild);
  const saved = await repo.save(repo.create(data));

  const key = cacheKeys.categoriesChildByParent.replace(
      ':parentId',
      data.parentId + '',
  );

  let merged = [];
  const all = JSON.parse((await cache.get(key)) || '[]') as CategoryChild[];

  if (!data.id) merged = [...all, saved];
  if (data.id) {
    merged = [...all.filter((it) => it.id !== data.id), saved];
  }

  await cache.set(key, JSON.stringify(merged));
  return saved;
}

/**
 * remove categoryChild and update cache
 * @param {number} id categoryChild's id
 * @param {any} cache cache client.
 * @return {CategoryChild} categoryChild
 */
async function removeCategoryChild(id: number, cache) {
  const repo = getRepository(CategoryChild);
  const found = await repo.findOne(id);

  if (!found) throw Error('Not found');
  await repo.delete(found.id);

  const key = cacheKeys.categoriesChildByParent.replace(
      ':parentId',
      found.parentId + '',
  );

  const all = JSON.parse((await cache.get(key)) || '[]');
  const filtered = [...all.filter((it) => it.id !== found.id)];
  await cache.set(key, JSON.stringify(filtered));

  return found;
}

export {
  categoryChildBySlug,
  // ** Mutation ** //
  saveCategoryChild,
  removeCategoryChild,
};
