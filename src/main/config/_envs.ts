import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
  PORT: z.coerce.number().default(4000),
  JWT_SECRET: z.string().default('ANY_JWT_SECRET'),
  MONGO_URL: z.string().url(),
});

const _envSchema = envSchema.safeParse(process.env);

if (_envSchema.success === false) {
  console.error("Invalid environment variables", _envSchema.error.format());

  throw new Error("Invalid environment variables");
}

export const _env = _envSchema.data;
