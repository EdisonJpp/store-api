import * as services from './services';
import { IResolvers } from '../../types';

export const resolvers: IResolvers = {
  Query: {
    categories: (_, __, { cache }) => services.categories(cache),
    categoryBySlug: (_, { slug }, { cache }) =>
      services.categoryBySlug(slug, cache),
  },
  Mutation: {},
};
