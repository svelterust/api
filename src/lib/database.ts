import Database from "bun:sqlite";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

// Create database
const sqlite = new Database(process.env.DATABASE_URL ?? "file:database.sqlite");
export const db = drizzle(sqlite, { schema });

// Use optimal settings
db.run(`
  PRAGMA journal_mode = WAL;
  PRAGMA busy_timeout = 5000;
  PRAGMA synchronous = NORMAL;
  PRAGMA cache_size = 1000000000;
  PRAGMA foreign_keys = true;
  PRAGMA temp_store = memory;
`);

// Run migrations automatically
migrate(db, { migrationsFolder: "migrations" });
