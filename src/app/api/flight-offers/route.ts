import { AMADEUS_API_URL } from "@configs/services.config";
import { AMADEUS_FLIGHTS_SEARCH_ENDPOINT } from "@constants/endpoint.constant";
import { getAmadeusAccessToken } from "@libs/amadeus/amadeus-token";
import { mapFlightSearchParams } from "@utils/flight-search/amadeus.util";
import { ResponseUtil } from "@utils/http/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const accessToken = await getAmadeusAccessToken();

    const url = new URL(
      `${AMADEUS_API_URL}/${AMADEUS_FLIGHTS_SEARCH_ENDPOINT}`
    );
    url.search = mapFlightSearchParams(req.nextUrl.searchParams).toString();

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        ResponseUtil.error(
          errText || "Failed to fetch flight offers",
          res.status
        ),
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(
      ResponseUtil.success(data, "Flight offers fetched successfully"),
      { status: 200 }
    );
  } catch (error: unknown) {
    if (isErrorWithMessage(error)) {
      console.error(
        `GET /${AMADEUS_FLIGHTS_SEARCH_ENDPOINT} error:`,
        error.message
      );
      return NextResponse.json(
        ResponseUtil.error(error.message, error.status ?? 500),
        { status: error.status ?? 500 }
      );
    }

    console.error(
      `GET /${AMADEUS_FLIGHTS_SEARCH_ENDPOINT} unknown error:`,
      error
    );
    return NextResponse.json(
      ResponseUtil.error("Unexpected server error", 500),
      { status: 500 }
    );
  }
}

function isErrorWithMessage(
  err: unknown
): err is { message: string; status?: number } {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as Record<string, unknown>).message === "string"
  );
}
