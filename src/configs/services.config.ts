// general
export const IS_PROD = process.env.NODE_ENV === "production";

// next-auth
export const JWT_SECRET = process.env.NEXTAUTH_SECRET?.trim();

// postgres
export const PG_DSN = process.env.POSTGRES_DSN?.trim();

// redis
export const REDIS_URL = process.env.REDIS_URL?.trim();
