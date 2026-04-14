import { z } from "zod";

const rawEnv =
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    ?.env ?? {};

const envSchema = z.object({
  PORT: z.string().default("4000").transform(Number),
  COOL_KEEPER_URL: z.url("COOL_KEEPER_URL must be a valid URL"),
  COOL_KEEPER_ORG_ID: z.uuid("COOL_KEEPER_ORG_ID must be a valid UUID"),
  COOL_KEEPER_API_KEY: z.string().min(1, "COOL_KEEPER_API_KEY is required"),
  COOL_KEEPER_REPO_URL: z.url("COOL_KEEPER_REPO_URL must be a valid URL"),
  COOL_KEEPER_BRANCH: z.string().min(1).default("main"),
});

export const config = envSchema.parse(rawEnv);

export type AppConfig = typeof config;
