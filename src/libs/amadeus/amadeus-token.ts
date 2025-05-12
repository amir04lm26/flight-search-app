import {
  AMADEUS_API_KEY,
  AMADEUS_API_SECRET,
  AMADEUS_API_URL,
} from "@configs/services.config";
import { AMADEUS_TOKEN_ENDPOINT } from "@constants/endpoint.constant";

export async function getAmadeusAccessToken(): Promise<string> {
  return fetch(`${AMADEUS_API_URL}/${AMADEUS_TOKEN_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: AMADEUS_API_KEY!,
      client_secret: AMADEUS_API_SECRET!,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          console.error("Token fetch failed:", res.status, text);
          throw new Error("Failed to get Amadeus access token");
        });
      }
      return res.json();
    })
    .then((data) => data.access_token)
    .catch((err) => {
      console.error("Token fetch error:", err);
      throw err;
    });
}
