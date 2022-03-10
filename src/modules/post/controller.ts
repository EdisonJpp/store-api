import { Post } from '../../entity/post';
import { IFilterParams } from '../../types';
import { getMutation } from '../../helpers/builder';
import { createQueryBuilder } from 'typeorm';
import { VALIDATE_CHECKBOX_TYPE_PARAMS } from './queries';

/**
 * filter by dynamic params and general params, category.
 * @param {IFilterParams} where slug .
 * @return {Post[]} posts.
 */
async function postWithFilter({ where }: IFilterParams) {
  const {
    take = 20,
    skip = 0,
    filter,
    checkboxParams = [],
    inputParams = [],
  } = where;

  const { categoryParentId, categoryChildId, searchNameValue, price } = filter;

  const items = createQueryBuilder<Post>(Post, 'post').where(
      'post.statusId = 1',
  );

  if (categoryParentId) {
    items.innerJoin(
        'post.category',
        'categoryChild',
        'categoryChild.parentId = :categoryParentId',
        { categoryParentId },
    );
  }

  if (checkboxParams.length) {
    const optionIds = [];
    const paramIds = checkboxParams.map((it) => {
      it.options.forEach((opt) => optionIds.push(opt.id));
      return it.id;
    });

    items.innerJoin('post.params', 'postParamsCheck');
    items.innerJoin(
        'postParamsCheck.param',
        'param',
        VALIDATE_CHECKBOX_TYPE_PARAMS,
        {
          optionIds,
          paramIds,
        },
    );
  }

  if (inputParams.length) {
    inputParams.forEach((inputParam, index) => {
      const postParams = `postparaminput${index + 1}`;
      const param = `paramInput${index + 1}`;

      items
          .innerJoin(
              'post.params',
              `${postParams}`,
              `${postParams}.postId = post.id`,
          )
          .innerJoin(
              `${postParams}.param`,
              `${param}`,
              `${param}.id = :id
            AND ${param}.parameterType = 'INPUT'
            AND ${postParams}.answer::INT BETWEEN :min AND :max
          `,
              { ...inputParam },
          );
    });
  }

  if (price) {
    items.andWhere('post.price BETWEEN :minValue AND :maxValue', price);
  }

  if (categoryChildId) {
    items.andWhere('post.categoryId = :categoryChildId', {
      categoryChildId,
    });
  }

  if (searchNameValue) {
    items.andWhere('LOWER(post.name) LIKE LOWER(:name)', {
      name: `%${searchNameValue}%`,
    });
  }

  return items
      .select([
        'post.id',
        'post.name',
        'post.price',
        'post.images',
        'commission.commission',
        'commission.commissionIn',
      ])
      .leftJoin('post.user', 'user', 'user.id = post.userId')
      .leftJoin('post.store', 'store', 'store.id = post.store.id')
      .leftJoin(
          'post.commission',
          'commission',
          'commission.id = post.commissionId',
      )
      .skip(skip)
      .take(take)
      .getMany();
};

// *** Mutations *** //
/**
 * create post.
 * @param {Post} data slug .
 * @return {Post} post.
 */
async function createPost(data: Post) {
  return getMutation<Post>(Post, { payload: data }).save();
};

export { postWithFilter, createPost };
