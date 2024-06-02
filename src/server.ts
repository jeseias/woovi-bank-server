import { ApolloServer } from "apollo-server-koa";
import { typeDefs } from "./presentation/gql-type-defs";
import mongoose from "mongoose";
import { env } from "bun";
import { appResolvers } from "./presentation/resolvers";
import Koa from "koa";
import Router from "koa-router";

mongoose
  .connect(env.MONGO_URL)
  .then(async () => {
    const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: appResolvers,
    });

    await server.start();

    const app = new Koa();
    const router = new Router();

    router.get("/", (ctx) => {
      ctx.body = "Woovi Bank Server";
    });

    app.use(router.routes()).use(router.allowedMethods());
    server.applyMiddleware({ app });

    const PORT = env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server listening on ${server.graphqlPath}`);
    });
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
