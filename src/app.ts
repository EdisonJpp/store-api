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

      const { is_authorized: token } = req.headers;

      if (token && !!["null", "undefined"].includes(token)) {
        authParams.token = token;
        authParams.isAuthenticated = true;
        authParams.userStarted = jwt.verify(
          token,
          process.env.APP_TOKEN_SECRET || "",
          (err, decoded) => !err && decoded
        );
      }

      return Object.assign(req, authParams, { cache: await redis });
    },
  });
}
