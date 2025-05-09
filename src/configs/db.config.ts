// general
export const IS_PROD = process.env.NODE_ENV === "production";

// next-auth
export const JWT_SECRET = process.env.NEXTAUTH_SECRET;

// postgres
const PG_USER = process.env.POSTGRES_USER;
const PG_PASS = process.env.POSTGRES_PASSWORD;
const PG_DB = process.env.POSTGRES_DB;

const PG_HOST = IS_PROD ? "postgres" : "localhost";
const PG_PORT = IS_PROD ? "5432" : "5435";

export const PG_DSN = `postgres://${PG_USER}:${PG_PASS}@${PG_HOST}:${PG_PORT}/${PG_DB}`;

// redis
const REDIS_HOST = IS_PROD ? "redis" : "localhost";
const REDIS_PORT = IS_PROD ? "6379" : "6380";

export const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;
