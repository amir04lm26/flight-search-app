import { PageLoading } from "@components/shared/loading/page-loading.component";
import FlightsWrapper from "@components/ui/flights/flights-wrapper.component";
import { SearchForm } from "@components/ui/search/search-form";
import { TopBanner } from "@components/ui/top-banner/top-banner.component";
import { NEXT_PUBLIC_BASE_URL } from "@configs/services.config";
import { FLIGHT_SEARCH_ENDPOINT } from "@constants/endpoint.constant";
import { FlightSearchApiResponse } from "@dto/flights.dto";
import { getFlightsSwrKey } from "@utils/flight-search/flights-swr.util";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: Promise<Record<string, string>>;
}>) {
  const sp = await searchParams;
  const swrKey = getFlightsSwrKey(sp);
  let jsonRes: FlightSearchApiResponse | null = null;

  if (swrKey) {
    const params = new URLSearchParams(sp).toString();
    const url = `${NEXT_PUBLIC_BASE_URL}/${FLIGHT_SEARCH_ENDPOINT}?${params}`;

    try {
      const res = await fetch(url, { next: { revalidate: 3600 } }); // 1 hour cache
      jsonRes = await res.json();
    } catch (err) {
      console.error("fetching flights failed", err);
    }
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <TopBanner />
      <SearchForm />
      <FlightsWrapper searchParams={sp} fallbackData={jsonRes} />
    </Suspense>
  );
}
