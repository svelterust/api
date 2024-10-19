import * as schema from "$lib/schema";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

// Create database
const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:database.sqlite",
  authToken: process.env.TURSO_AUTH_TOKEN,
  syncUrl: process.env.TURSO_SYNC_URL,
  syncInterval: process.env.TURSO_SYNC_URL ? 300 : undefined,
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
