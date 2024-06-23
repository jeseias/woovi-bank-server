import { accountResolvers } from "./account-resolvers";
import { authResolvers } from "./auth-resolver";
import { transactionResolvers } from "./transaction-resolvers";
import { usersResolvers } from "./users-resolvers";

export const appResolvers = {
  Mutation: {
    ...authResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
  Query: {
    ...accountResolvers.Query,
    ...usersResolvers.Query,
  },
};
