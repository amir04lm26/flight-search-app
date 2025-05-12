import { PageLoading } from "@components/shared/loading/page-loading.component";
import { FlightsList } from "@components/ui/flights/flights-list.component";
import { SearchForm } from "@components/ui/search/search-form";
import { TopBanner } from "@components/ui/top-banner/top-banner.component";
import { NEXT_PUBLIC_BASE_URL } from "@configs/services.config";
import { FLIGHT_SEARCH_ENDPOINT } from "@constants/endpoint.constant";
import { IFlightSearchResponse } from "@dto/flights.dto";
import { ApiResponse } from "@utils/http/response";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: Promise<Record<string, string>>;
}>) {
  const sp = await searchParams;
  const hasRequiredParams =
    sp.originLocationCode &&
    sp.destinationLocationCode &&
    sp.departureDate &&
    sp.adults;
  let jsonRes: ApiResponse<IFlightSearchResponse> | null = null;

  if (hasRequiredParams) {
    const params = new URLSearchParams(sp).toString();
    const url = `${NEXT_PUBLIC_BASE_URL}/${FLIGHT_SEARCH_ENDPOINT}?${params}`;

    try {
      const res = await fetch(url, { next: { revalidate: 3600 } }); // 1 hour cache
      jsonRes = await res.json();
    } catch (err) {
      console.error("fetching flights failed", err);
    }
  }

  console.log({ jsonRes });

  return (
    <Suspense fallback={<PageLoading />}>
      <TopBanner />
      <SearchForm />
      <FlightsList />
    </Suspense>
  );
}
