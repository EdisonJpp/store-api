import * as path from "path";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const allTypes = loadFilesSync(path.join(__dirname, "../modules/**/*.graphql"));
const typeDefs = mergeTypeDefs(allTypes);
const allResolvers = loadFilesSync(
  path.join(__dirname, "../modules/**/resolvers.*")
);
const resolvers = mergeResolvers(allResolvers);

export { typeDefs, resolvers };
