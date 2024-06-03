import { Context, Next } from "koa";
import jwt from "jsonwebtoken";
import { _env } from "../config/_envs";

const tokenValidationMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.headers?.["x-access-token"];

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: "Authorization header is missing" };
    return;
  }

  try {
    jwt.verify(token as string, _env.JWT_SECRET);
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: "Invalid or expired token" };
  }
};

const publicMutations = ["RegisterUser", "LoginUser"];
export const authMiddleware = async (ctx: Context, next: Next) => {
  const body = ctx.request.body as { operationName: string };

  if (
    (body &&
      body.operationName &&
      publicMutations.includes(body.operationName)) ||
    body.operationName === "IntrospectionQuery"
  ) {
    await next();
  } else {
    await tokenValidationMiddleware(ctx, next);
  }
};
