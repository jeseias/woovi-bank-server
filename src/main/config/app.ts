import Koa from "koa";
import Router from "koa-router";
import { renderGraphiQL } from "@/presentation/graphiql";

const app = new Koa();
const router = new Router();

app.use(router.routes()).use(router.allowedMethods());

router.get("/", (ctx) => {
  ctx.body = "Woovi Bank Server";
});

router.get("/__playground", (ctx) => {
  ctx.body = renderGraphiQL({ endpoint: "/graphql" });
});

export { app };
