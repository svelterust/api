import { type Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  out: "migrations",
  schema: "src/lib/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "file:database.sqlite",
  },
} satisfies Config;
