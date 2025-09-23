import Database from "better-sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schemas/schema";

const sqlite = new Database(process.env.DB_FILE_NAME!);

export const db = drizzle(sqlite, { schema });
