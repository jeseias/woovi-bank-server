import { ApolloServer } from "apollo-server-koa";
import { typeDefs } from "./presentation/gql-type-defs";
import mongoose from "mongoose";
import { appResolvers } from "./presentation/resolvers";
import { _env } from "./main/config/_envs";

mongoose
  .connect(_env.MONGO_URL)
  .then(async () => {
    const { app } = await import("./main/config/app");
    const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: appResolvers,
    });

    await server.start();

    server.applyMiddleware({ app });

    const PORT = _env.PORT;

    app.listen(PORT, () => {
      console.log(`Server listening on ${server.graphqlPath}`);
    });
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
