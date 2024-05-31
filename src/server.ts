import { ApolloServer } from "apollo-server";
import { typeDefs } from "./presentation/gql-type-defs";
import mongoose from "mongoose";
import { env } from "bun";
import { appResolvers } from "./presentation/resolvers";

mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: appResolvers,
    });

    server.listen().then(({ url }) => {
      console.log(`Server listening on ${url}`);
    });
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });