import { format, subDays, addDays } from "date-fns";
import { FLIGHT_SEARCH_ENDPOINT } from "@constants/endpoint.constant";
import { DEFAULT_DATE_FORMAT } from "@constants/date.constant";
import { getFlightsSwrKey } from "./flights-swr.util";

jest.mock("@configs/services.config", () => ({
  NEXT_PUBLIC_BASE_URL: "https://api.example.com",
}));

jest.mock("@constants/endpoint.constant", () => ({
  FLIGHT_SEARCH_ENDPOINT: "flights/search",
}));

describe("getFlightsSwrKey", () => {
  const today = new Date();

  it("should return null if required params are missing", () => {
    expect(getFlightsSwrKey({})).toBeNull();
    expect(getFlightsSwrKey({ origin: "DXB" })).toBeNull();
    expect(getFlightsSwrKey({ destination: "IST" })).toBeNull();
    expect(getFlightsSwrKey({ origin: "DXB", destination: "IST" })).toBeNull();
  });

  it("should return key without modifying future dates", () => {
    const depDate = format(addDays(today, 2), DEFAULT_DATE_FORMAT);
    const retDate = format(addDays(today, 5), DEFAULT_DATE_FORMAT);

    const key = getFlightsSwrKey({
      origin: "DXB",
      destination: "IST",
      "departure-date": depDate,
      "return-date": retDate,
    });

    expect(key).toBe(
      `https://api.example.com/${FLIGHT_SEARCH_ENDPOINT}?origin=DXB&destination=IST&departure-date=${depDate}&return-date=${retDate}`
    );
  });

  it("should set departure to today if it's in the past", () => {
    const pastDate = format(subDays(today, 2), DEFAULT_DATE_FORMAT);

    const searchParams = {
      origin: "DXB",
      destination: "IST",
      "departure-date": pastDate,
    };

    const key = getFlightsSwrKey({ ...searchParams });

    const todayFormatted = format(today, DEFAULT_DATE_FORMAT);
    expect(key).toBe(
      `https://api.example.com/${FLIGHT_SEARCH_ENDPOINT}?origin=DXB&destination=IST&departure-date=${todayFormatted}`
    );
  });

  it("should adjust return date to preserve trip length", () => {
    const pastDeparture = format(subDays(today, 3), DEFAULT_DATE_FORMAT);
    const returnDate = format(
      addDays(subDays(today, 3), 5),
      DEFAULT_DATE_FORMAT
    );

    const searchParams = {
      origin: "DXB",
      destination: "IST",
      "departure-date": pastDeparture,
      "return-date": returnDate,
    };

    const key = getFlightsSwrKey({ ...searchParams });

    const expectedDeparture = format(today, DEFAULT_DATE_FORMAT);
    const expectedReturn = format(addDays(today, 5), DEFAULT_DATE_FORMAT);

    expect(key).toBe(
      `https://api.example.com/${FLIGHT_SEARCH_ENDPOINT}?origin=DXB&destination=IST&departure-date=${expectedDeparture}&return-date=${expectedReturn}`
    );
  });

  it("should ensure trip length is at least 1 day if return is before departure", () => {
    const pastDeparture = format(subDays(today, 5), DEFAULT_DATE_FORMAT);
    const invalidReturn = format(subDays(today, 6), DEFAULT_DATE_FORMAT);

    const searchParams = {
      origin: "DXB",
      destination: "IST",
      "departure-date": pastDeparture,
      "return-date": invalidReturn,
    };

    const key = getFlightsSwrKey({ ...searchParams });

    const expectedDeparture = format(today, DEFAULT_DATE_FORMAT);
    const expectedReturn = format(addDays(today, 1), DEFAULT_DATE_FORMAT);

    expect(key).toBe(
      `https://api.example.com/${FLIGHT_SEARCH_ENDPOINT}?origin=DXB&destination=IST&departure-date=${expectedDeparture}&return-date=${expectedReturn}`
    );
  });
});
