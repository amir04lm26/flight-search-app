// general
export const IS_PROD = process.env.NODE_ENV === "production";
export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// next-auth
export const JWT_SECRET = process.env.NEXTAUTH_SECRET?.trim();

// postgres
export const PG_DSN = process.env.POSTGRES_DSN?.trim();

// redis
export const REDIS_URL = process.env.REDIS_URL?.trim();

// flight
export const AMADEUS_API_URL = process.env.AMADEUS_API_URL?.trim();
export const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY?.trim();
export const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET?.trim();
