import * as schema from "$lib/schema";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

// Create database
const client = createClient({
  url: process.env.DATABASE_URL ?? "file:database.sqlite",
});
export const db = drizzle(client, { schema });

// Use optimal settings
await db.run(`
  PRAGMA journal_mode = WAL;
  PRAGMA busy_timeout = 5000;
  PRAGMA synchronous = NORMAL;
  PRAGMA cache_size = 1000000000;
  PRAGMA foreign_keys = true;
  PRAGMA temp_store = memory;
`);

// Run migrations automatically
await migrate(db, { migrationsFolder: "migrations" });
