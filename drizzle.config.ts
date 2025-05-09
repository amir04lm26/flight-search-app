import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const PG_USER = process.env.POSTGRES_USER;
const PG_PASS = process.env.POSTGRES_PASSWORD;
const PG_DB = process.env.POSTGRES_DB;
const PG_DSN = `postgres://${PG_USER}:${PG_PASS}@localhost:5435/${PG_DB}`;

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: PG_DSN,
  },
});
