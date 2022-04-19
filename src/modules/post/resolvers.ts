import * as services from './services';

import { Post } from '../../entity/post';
import { IResolvers } from '../../types';
import { IFilterParams } from '../../types';
import { isAuthenticated } from '../../helpers';

export const resolvers: IResolvers = {
  Query: {
    posts: (_, { where }: IFilterParams) =>
      services.postWithFilter({ where }),
  },
  Mutation: {
    createPost: (_, { data: payload }, ctx) => {
      isAuthenticated(ctx);
      return services.createPost(payload as Post);
    },
  },
};
