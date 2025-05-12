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
  const params = new URLSearchParams(await searchParams).toString();
  const url = `${NEXT_PUBLIC_BASE_URL}/${FLIGHT_SEARCH_ENDPOINT}?${params}`;
  const res = await fetch(url, { next: { revalidate: 3600 } }); // cache for 1 hour
  const jsonRes: ApiResponse<IFlightSearchResponse> = await res.json();

  console.log({ jsonRes });

  return (
    <Suspense fallback={<PageLoading />}>
      <TopBanner />
      <SearchForm />
      <FlightsList />
    </Suspense>
  );
}
