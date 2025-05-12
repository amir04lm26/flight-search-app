import { ApiResponse } from "@utils/http/response";

export type FlightSearchApiResponse = ApiResponse<IFlightSearchResponse>;

export interface IFlightSearchResponse {
  data: IFlightOffer[];
  dictionaries: {
    aircraft: Record<string, string>;
    currencies: Record<string, string>;
    carriers: Record<string, string>;
  };
}

interface IFlightOffer {
  id: string;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: {
    currency: string;
    grandTotal: string;
  };
  validatingAirlineCodes: string[];
}

interface Itinerary {
  duration: string;
  segments: ISegment[];
}

interface ISegment {
  id: string;
  departure: {
    iataCode: string;
    at: string; // ISO timestamp
  };
  arrival: {
    iataCode: string;
    at: string; // ISO timestamp
  };
  carrierCode: string;
  aircraft: {
    code: string;
  };
  duration: string; // e.g., "PT2H5M"
  numberOfStops: number;
}
