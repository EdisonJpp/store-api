import * as controller from "./controller";
import { IResolvers } from "../../types";

export const resolvers: IResolvers = {
  Query: {
    categories: async (_, __, { cache }) => controller.categories(cache),
  },
  Mutation: {},
};
