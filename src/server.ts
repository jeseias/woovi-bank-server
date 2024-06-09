import "module-alias/register";

import { ApolloServer } from "apollo-server-koa";
import { typeDefs } from "./presentation/gql-type-defs";
import mongoose from "mongoose";
import { appResolvers } from "./presentation/resolvers";
import { _env } from "./main/config/_envs";
import { authMiddleware } from "./main/middlewares/auth-middleware";

async function startServer() {
  try {
    await mongoose.connect(_env.MONGO_URL);

    const { app } = await import("./main/config/app");
    const server = new ApolloServer({
      typeDefs,
      resolvers: appResolvers,
      introspection: true,
      context: async ({ ctx }) => {
        await authMiddleware(ctx, async () => {});
        if (ctx.status === 401) {
          throw new Error("Unauthorized");
        }
        return { user: ctx.state.user };
      },
    });

    await server.start();

    server.applyMiddleware({ app });

    const PORT = _env.PORT;

    app.listen(PORT, () => {
      console.log(`Server listening on ${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
