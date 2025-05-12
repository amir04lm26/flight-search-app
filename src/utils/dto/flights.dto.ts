export interface IFlightSearchResponse {
  data: {
    meta: {
      count: number;
      links: {
        self: string;
      };
    };
    data: IFlightOffer[];
    dictionaries: {
      locations: Record<
        string,
        {
          cityCode: string;
          countryCode: string;
        }
      >;
      aircraft: Record<string, string>;
      currencies: Record<string, string>;
      carriers: Record<string, string>;
    };
  };
}

interface IFlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  isUpsellOffer: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: {
    currency: string;
    total: string;
    base: string;
    fees: {
      amount: string;
      type: string;
    }[];
    grandTotal: string;
    additionalServices?: {
      amount: string;
      type: string;
    }[];
  };
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: ITravelerPricing[];
}

interface Itinerary {
  duration: string;
  segments: ISegment[];
}

interface ISegment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating?: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

interface ITravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: {
    currency: string;
    total: string;
    base: string;
  };
  fareDetailsBySegment: IFareDetailsBySegment[];
}

interface IFareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare?: string;
  brandedFareLabel?: string;
  class: string;
  includedCheckedBags: {
    quantity?: number;
    weight?: number;
    weightUnit?: string;
  };
  includedCabinBags: {
    quantity: number;
  };
  amenities?: IAmenity[];
}

interface IAmenity {
  description: string;
  isChargeable: boolean;
  amenityType: string;
  amenityProvider: {
    name: string;
  };
}
