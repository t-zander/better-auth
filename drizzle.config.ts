import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schemas",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});
