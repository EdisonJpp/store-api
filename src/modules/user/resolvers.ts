import { isNil, omitBy } from "lodash";
import { getMutation } from "../../helpers/builder";

import { getFind } from "../../helpers/builder";
import { UserEntity } from "../../entity/user";
import { IResolvers } from "../../types";
import { isAuthenticated } from "../../helpers/index";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const resolvers: IResolvers = {
  Query: {
    user: (_, { where, relations }): Promise<UserEntity> => {
      return getFind<UserEntity>(UserEntity, { where, relations }).findOne();
    },
    users: (_, { where, relations }) => {
      return getFind<UserEntity>(UserEntity, { where, relations }).findAll();
    },
    profile: async (_, { token }, ctx) => {
      isAuthenticated(ctx);

      if (token) {
        const user = await jwt.verify(token, process.env.APP_TOKEN_SECRET);
        return user.item;
      }

      return ctx.userStarted.item;
    },
  },
  Mutation: {
    loginApp: async (_, { where }) => {
      const item = await getFind<UserEntity>(UserEntity, {
        where: { email: where.email },
      }).findOne();

      if (!item) throw Error("Data incorrect");

      const passwordVerified = await bcrypt.compare(
        where.password,
        item.password
      );
      const emailVerified = item.email === where.email;

      if (!passwordVerified) throw Error("Data incorrect");
      if (!emailVerified) throw Error("Data incorrect");

      const token = jwt.sign({ item }, process.env.APP_TOKEN_SECRET, {
        expiresIn: "23hr",
      });

      return {
        token,
        profile: item,
      };
    },
    createUser: async (_, { data: payload }) => {
      return getMutation<UserEntity>(UserEntity, {
        payload,
      }).save();
    },
    updateUser: async (_, { data, where }, ctx) => {
      isAuthenticated(ctx);

      const payload = omitBy({ ...data }, isNil) as UserEntity;
      return getMutation<UserEntity>(UserEntity, {
        where,
        payload,
      }).update();
    },
  },
};
