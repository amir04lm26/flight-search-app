"use client";

import { SWRConfig } from "swr";
import { FlightsList } from "./flights-list.component";
import { ApiResponse } from "@utils/http/response";
import { IFlightSearchResponse } from "@dto/flights.dto";
import { getFlightsSwrKey } from "@utils/flight-search/flights-swr.util";

type FlightsWrapperProps = Readonly<{
  searchParams: Record<string, string>;
  fallbackData: ApiResponse<IFlightSearchResponse> | null;
}>;

export default function FlightsWrapper({
  searchParams,
  fallbackData,
}: FlightsWrapperProps) {
  const swrKey = getFlightsSwrKey(searchParams);

  return (
    <SWRConfig
      value={{
        fallback: swrKey && fallbackData ? { [swrKey]: fallbackData } : {},
      }}>
      <FlightsList />
    </SWRConfig>
  );
}
