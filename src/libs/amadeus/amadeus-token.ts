import {
  AMADEUS_API_KEY,
  AMADEUS_API_SECRET,
  AMADEUS_API_URL,
} from "@configs/services.config";
import { AMADEUS_TOKEN_ENDPOINT } from "@constants/endpoint.constant";
import { RedisClient } from "@libs/redis/client";

const CACHE_KEY = "amadeus:access_token";

/**
 * Fetch Amadeus Access Token
 * @param forceFetch - If true, bypass the cache and fetch a new token
 */
export async function getAmadeusAccessToken(
  forceFetch = false
): Promise<string> {
  const redis = await RedisClient.new();

  if (!forceFetch) {
    const cachedToken = await redis.get(CACHE_KEY);
    if (cachedToken) return cachedToken;
  }

  const res = await fetch(`${AMADEUS_API_URL}/${AMADEUS_TOKEN_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: AMADEUS_API_KEY!,
      client_secret: AMADEUS_API_SECRET!,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Token fetch failed:", res.status, errText);
    throw new Error("Failed to get Amadeus access token");
  }

  const data = await res.json();

  // Cache token in Redis with expiry buffer (e.g. 5 seconds less)
  const ttl = Math.max(0, data.expires_in - 5);
  await redis.set(CACHE_KEY, data.access_token, { EX: ttl });

  return data.access_token;
}
