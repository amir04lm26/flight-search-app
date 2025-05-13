import { AMADEUS_API_URL } from "@configs/services.config";
import { AMADEUS_FLIGHTS_SEARCH_ENDPOINT } from "@constants/endpoint.constant";
import { getAmadeusAccessToken } from "@libs/amadeus/amadeus-token";
import { mapFlightSearchParams } from "@utils/flight-search/amadeus.util";
import { ResponseUtil } from "@utils/http/response";
import { NextRequest, NextResponse } from "next/server";

export function isErrorWithMessage(
  err: unknown
): err is { message: string; status?: number } {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as Record<string, unknown>).message === "string"
  );
}

export async function fetchWithAmadeusToken(
  req: NextRequest
): Promise<NextResponse> {
  const url = new URL(`${AMADEUS_API_URL}/${AMADEUS_FLIGHTS_SEARCH_ENDPOINT}`);
  url.search = mapFlightSearchParams(req.nextUrl.searchParams).toString();

  let attempt = 0;
  let lastRes: Response | null = null;

  while (attempt < 2) {
    const forceFetch = attempt === 1;
    const token = await getAmadeusAccessToken(forceFetch);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(
        ResponseUtil.success(data, "Flight offers fetched successfully"),
        { status: 200 }
      );
    }

    if (res.status !== 401 && res.status !== 403) {
      const errText = await res.text();
      return NextResponse.json(
        ResponseUtil.error(
          errText || "Failed to fetch flight offers",
          res.status
        ),
        { status: res.status }
      );
    }

    // Save the last response in case second attempt also fails
    lastRes = res;
    attempt++;
  }

  const errText = await lastRes!.text();
  return NextResponse.json(
    ResponseUtil.error(errText || "Authorization failed", lastRes!.status),
    { status: lastRes!.status }
  );
}
