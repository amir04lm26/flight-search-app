// general
export const IS_PROD = process.env.NODE_ENV === "production";

// next-auth
export const JWT_SECRET = process.env.NEXTAUTH_SECRET;

// postgres
export const PG_DSN = process.env.POSTGRES_DSN;

// redis
export const REDIS_URL = process.env.REDIS_URL;
