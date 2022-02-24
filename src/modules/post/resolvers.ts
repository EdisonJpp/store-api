import * as controller from "./controller";

import { Post } from "../../entity/post";
import { IResolvers } from "../../types";
import { IFilterParams } from "../../types";
import { isAuthenticated } from "../../helpers";

export const resolvers: IResolvers = {
  Query: {
    posts: (_, { where }: IFilterParams) =>
      controller.postWithFilter({ where }),
  },
  Mutation: {
    createPost: (_, { data: payload }, ctx) => {
      isAuthenticated(ctx);
      controller.createPost(payload as Post);
    },
  },
};
