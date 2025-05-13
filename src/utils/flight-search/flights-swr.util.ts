import {
  isBefore,
  startOfDay,
  format,
  differenceInCalendarDays,
  addDays,
  parseISO,
} from "date-fns";
import { NEXT_PUBLIC_BASE_URL } from "@configs/services.config";
import { FLIGHT_SEARCH_ENDPOINT } from "@constants/endpoint.constant";
import { DEFAULT_DATE_FORMAT } from "@constants/date.constant";

export function getFlightsSwrKey(
  searchParams: Record<string, string>
): string | null {
  const {
    origin,
    destination,
    "departure-date": departureDateStr,
    "return-date": returnDateStr,
  } = searchParams;

  if (!origin || !destination || !departureDateStr) return null;

  const today = startOfDay(new Date());
  const departureDate = startOfDay(parseISO(departureDateStr));

  if (isBefore(departureDate, today)) {
    // Preserve the number of days between departure and return
    let dayDiff = 1; // default trip length
    if (returnDateStr) {
      const returnDate = startOfDay(parseISO(returnDateStr));
      dayDiff = Math.max(
        1,
        differenceInCalendarDays(returnDate, departureDate)
      );
    }

    const newDeparture = today;
    const newReturn = addDays(today, dayDiff);

    searchParams["departure-date"] = format(newDeparture, DEFAULT_DATE_FORMAT);
    if (returnDateStr) {
      searchParams["return-date"] = format(newReturn, DEFAULT_DATE_FORMAT);
    }
  }

  const params = new URLSearchParams(searchParams).toString();
  return `${NEXT_PUBLIC_BASE_URL}/${FLIGHT_SEARCH_ENDPOINT}?${params}`;
}
