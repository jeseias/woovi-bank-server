import { accountResolvers } from "./account-resolvers";
import { authResolvers } from "./auth-resolver";
import { transactionResolvers } from "./transaction-resolvers";

export const appResolvers = {
  Mutation: {
    ...authResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
  Query: {
    ...accountResolvers.Query,
  },
};
