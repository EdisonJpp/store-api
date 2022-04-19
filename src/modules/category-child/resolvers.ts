import * as services from './services';

import { IResolvers } from '../../types';
import { CategoryChild } from '@entity/category-child';
import { isAuthenticated } from '../../helpers';

export const resolvers: IResolvers = {
  Query: {
    categoryChildBySlug: (_, { slug }, { cache }) => {
      return services.categoryChildBySlug(slug, cache);
    },
  },
  Mutation: {
    removeCategoryChild: (_, { id }, ctx) => {
      isAuthenticated(ctx);
      return services.removeCategoryChild(id, ctx.cache);
    },
    saveCategoryChild: (_, { data }: {data: CategoryChild}, ctx) => {
      isAuthenticated(ctx);
      return services.saveCategoryChild(data, ctx.cache);
    },
  },
};
