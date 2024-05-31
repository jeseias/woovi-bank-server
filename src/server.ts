import { ApolloServer } from "apollo-server";
import { typeDefs } from "./presentation/gql-type-defs";
import { authResolvers } from "./presentation/auth-resolver";
import mongoose from "mongoose";
import { env } from "bun";

mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: {
        ...authResolvers,
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