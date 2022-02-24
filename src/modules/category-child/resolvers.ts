import * as controller from "./controller";

import { IResolvers } from "../../types";
import { CategoryChild } from "@entity/category-child";
import { isAuthenticated } from "../../helpers";

export const resolvers: IResolvers = {
  Query: {
    categoriesChildByParent: async (_, { categoryParentId }, ctx) => {
      return controller.categoriesChildByParent(categoryParentId, ctx.cache);
    },
    categoryChild: async (_, { categoryChildId }, { cache }) => {
      return controller.categoryChild(categoryChildId, cache);
    },
  },
  Mutation: {
    removeCategoryChild: (_, { id }, ctx) => {
      isAuthenticated(ctx);
      return controller.removeCategoryChild(id, ctx.cache);
    },
    saveCategoryChild: (_, { data }: { data: CategoryChild }, ctx) => {
      isAuthenticated(ctx);
      return controller.saveCategoryChild(data, ctx.cache);
    },
  },
};
