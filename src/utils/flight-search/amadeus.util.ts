export function mapFlightSearchParams(
  params: URLSearchParams
): URLSearchParams {
  const origin = params.get("origin"); // LON
  const destination = params.get("destination"); // PAR
  const departureDate = params.get("departure-date");
  const returnDate = params.get("return-date");
  const adult = params.get("adult");
  const child = params.get("child");

  const searchParams = {
    ...(origin && { originLocationCode: origin.toUpperCase() }),
    ...(destination && { destinationLocationCode: destination.toUpperCase() }),
    ...(departureDate && { departureDate }),
    ...(returnDate && { returnDate }),
    ...(adult && { adults: adult }),
    ...(child && { children: child }),
    currencyCode: "USD",
    max: "10",
  };

  return new URLSearchParams(searchParams);
}
