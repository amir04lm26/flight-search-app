"use client";

import { PageLoading } from "@components/shared/loading/page-loading.component";
import { useFlights } from "@hooks/flights/use-flights.hook";
import { PageMessage } from "../messages/page-message.component";

export function FlightsList() {
  const { swrKey, data, error, isLoading } = useFlights();

  if (!swrKey) return null;
  if (isLoading) return <PageLoading />;
  if (error || data?.error)
    return (
      <PageMessage
        type='error'
        message='Error fetching flights. Please try again later.'
      />
    );
  if (!data?.data?.data || data.data?.data?.length === 0)
    return (
      <PageMessage type='empty' message='No flights found for your search.' />
    );

  return (
    <section className='mt-8'>
      <div className='max-w-6xl mx-auto px-2 sm:px-4 md:px-6'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
          Available Flights
        </h1>

        {data.data.data.map((flight) => (
          <div
            key={flight.id}
            className='border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow mb-6'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-3 sm:gap-4 mb-4'>
              <div>
                <div className='text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100'>
                  {flight.validatingAirlineCodes.join(", ")}
                </div>
                <div className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                  {flight.oneWay ? "One-way" : "Round-trip"} · Seats:{" "}
                  {flight.numberOfBookableSeats}
                </div>
              </div>

              <div className='text-right'>
                <div className='text-base sm:text-lg md:text-xl font-bold text-primary dark:text-primary-light'>
                  {flight.price.currency} {flight.price.grandTotal}
                </div>
                <div className='text-xs text-gray-400'>per ticket</div>
              </div>
            </div>

            {flight.itineraries.map((itinerary, i) => (
              <div key={itinerary.duration + i} className='mb-4'>
                <h2 className='text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Leg {i + 1} · Duration:{" "}
                  {itinerary.duration.replace("PT", "").toLowerCase()}
                </h2>

                <div className='border-l-2 border-dashed border-gray-300 dark:border-gray-600 pl-3 sm:pl-4 space-y-4'>
                  {itinerary.segments.map((segment) => (
                    <div
                      key={segment.id}
                      className='flex items-start gap-3 sm:gap-4'>
                      <div className='mt-1.5 w-2 h-2 rounded-full bg-blue-500' />

                      <div className='flex-1'>
                        <div className='flex justify-between text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300'>
                          <span className='font-medium'>
                            {segment.departure.iataCode}
                          </span>
                          <span className='text-[10px] sm:text-xs text-gray-500 dark:text-gray-400'>
                            {new Date(segment.departure.at).toLocaleString()}
                          </span>
                        </div>

                        <div className='text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1'>
                          ➤ Flight {segment.carrierCode} · Aircraft:{" "}
                          {segment.aircraft.code} · Duration:{" "}
                          {segment.duration.replace("PT", "").toLowerCase()} ·
                          Stops: {segment.numberOfStops}
                        </div>

                        <div className='flex justify-between text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 mt-2'>
                          <span className='font-medium'>
                            {segment.arrival.iataCode}
                          </span>
                          <span className='text-[10px] sm:text-xs text-gray-500 dark:text-gray-400'>
                            {new Date(segment.arrival.at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
