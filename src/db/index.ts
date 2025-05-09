import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { PG_DSN } from "@configs/db.config";

const pool = new Pool({
  connectionString: PG_DSN,
});

const db = drizzle(pool, { schema });

export { db, pool };
