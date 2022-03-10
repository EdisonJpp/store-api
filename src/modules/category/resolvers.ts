import * as controller from './controller';
import { IResolvers } from '../../types';

export const resolvers: IResolvers = {
  Query: {
    categories: (_, __, { cache }) => controller.categories(cache),
    categoryBySlug: (_, { slug }, { cache }) =>
      controller.categoryBySlug(slug, cache),
  },
  Mutation: {},
};
