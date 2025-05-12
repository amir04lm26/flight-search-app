import { FlightSearchApiResponse } from "@dto/flights.dto";
import { getFlightsSwrKey } from "@utils/flight-search/flights-swr.util";
import { useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFlights() {
  const { fallback } = useSWRConfig();
  const sp = useSearchParams();
  const spObj = Object.fromEntries(sp.entries());
  const swrKey = getFlightsSwrKey(spObj);

  const { data, error, isLoading } = useSWR<FlightSearchApiResponse>(
    swrKey,
    fetcher,
    {
      revalidateOnMount: !fallback[swrKey ?? ""],
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  return {
    swrKey,
    data,
    error,
    isLoading,
  };
}
