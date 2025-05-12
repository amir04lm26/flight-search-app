import { NEXT_PUBLIC_BASE_URL } from "@configs/services.config";
import { FLIGHT_SEARCH_ENDPOINT } from "@constants/endpoint.constant";

export function getFlightsSwrKey(
  searchParams: Record<string, string>
): string | null {
  const hasRequiredParams =
    searchParams.origin &&
    searchParams.destination &&
    searchParams["departure-date"];

  if (!hasRequiredParams) return null;

  const params = new URLSearchParams(searchParams).toString();
  return `${NEXT_PUBLIC_BASE_URL}/${FLIGHT_SEARCH_ENDPOINT}?${params}`;
}
