const jwt = require("jsonwebtoken");

import { UserEntity } from "./entity/user";
import { typeDefs, resolvers } from "./lib/schema";
import { ApolloServer, CorsOptions } from "apollo-server";
import createClient from "./lib/cache";

interface IAuthParams {
  userStarted: UserEntity | null;
  token: string | null;
  isAuthenticated: boolean | null;
}

export default function server(): ApolloServer {
  const cors: CorsOptions = {
    origin: "*",
    credentials: true,
  };

  const redis = createClient();

  return new ApolloServer({
    cors,
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const authParams: IAuthParams = {
        token: null,
        userStarted: null,
        isAuthenticated: null,
      };

      const token = req.headers?.is_authorized;

      if (token && token !== "null" && token !== "undefined") {
        authParams.token = token;
        authParams.isAuthenticated = true;
        authParams.userStarted = jwt.verify(
          token,
          process.env.APP_TOKEN_SECRET || "",
          (err, decoded) => {
            if (err) return null;
            return decoded;
          }
        );
      }

      return Object.assign(req, authParams, { cache: await redis });
    },
  });
}
