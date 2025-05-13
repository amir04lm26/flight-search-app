import { AMADEUS_FLIGHTS_SEARCH_ENDPOINT } from "@constants/endpoint.constant";
import { ResponseUtil } from "@utils/http/response";
import { NextRequest, NextResponse } from "next/server";
import { fetchWithAmadeusToken, isErrorWithMessage } from "./route.util";

export async function GET(req: NextRequest) {
  try {
    const response = await fetchWithAmadeusToken(req);
    return response;
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
