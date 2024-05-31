import { ApolloServer } from "apollo-server";
import { typeDefs } from "./presentation/gql-type-defs";
import { authResolvers } from "./presentation/auth-resolver";
import mongoose from "mongoose";
import { env } from "bun";
import { transactionResolvers } from "./presentation/transaction-resolvers";

mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: {
        Mutation: {
          ...authResolvers.Mutation,
          ...transactionResolvers.Mutation,
        },
      },
    });

    server.listen().then(({ url }) => {
      console.log(`Server listening on ${url}`);
    });
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });