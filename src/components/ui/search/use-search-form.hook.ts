import {
  addDays,
  differenceInDays,
  format,
  isBefore,
  parseISO,
} from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { SearchFormData } from "./search.model";
import { useEffect } from "react";
import { DEFAULT_DATE_FORMAT } from "@constants/date.constant";
import { IGuestInfo } from "./guest-selection/guest-selection.component";

export function useSearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const today = new Date();
  const todayStr = format(today, DEFAULT_DATE_FORMAT);

  const queryDeparture = searchParams.get("departureDate");
  const queryReturn = searchParams.get("returnDate");

  const defaultDeparture =
    queryDeparture && !isBefore(parseISO(queryDeparture), today)
      ? queryDeparture
      : todayStr;

  const defaultReturn =
    queryReturn && !isBefore(parseISO(queryReturn), parseISO(defaultDeparture))
      ? queryReturn
      : "";

  const searchForm = useForm<SearchFormData>({
    defaultValues: {
      origin: searchParams.get("origin") ?? "",
      destination: searchParams.get("destination") ?? "",
      departureDate: defaultDeparture,
      returnDate: defaultReturn,
      child: Number(searchParams.get("child")) || 0,
      adult: Number(searchParams.get("adult")) || 1,
      rooms: Number(searchParams.get("rooms")) || 1,
    },
  });
  const { watch, setValue } = searchForm;

  useEffect(() => {
    // Sync form values with query string (in case of external change)
    setValue("departureDate", defaultDeparture);
    setValue("returnDate", defaultReturn);
  }, [defaultDeparture, defaultReturn, setValue]);

  const onSubmit = async (data: SearchFormData) => {
    const query = new URLSearchParams({
      origin: data.origin,
      destination: data.destination,
      "departure-date": data.departureDate,
      ...(data.returnDate && { "return-date": data.returnDate }),
      ...(data.child && { child: data.child.toString() }),
      ...(data.adult && { adult: data.adult.toString() }), // value > 1 -> greater than default value
      ...(data.rooms && { rooms: data.rooms.toString() }),
    });

    router.push(`?${query.toString()}`);
  };

  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");

  const handleDepartureDateChange = (val: string) => {
    const oldDepartureDate = departureDate;
    setValue("departureDate", val, { shouldValidate: true });

    if (oldDepartureDate && returnDate) {
      const daysDifference = differenceInDays(
        parseISO(returnDate),
        parseISO(oldDepartureDate)
      );

      const updatedReturnDate = addDays(parseISO(val), daysDifference);
      setValue("returnDate", format(updatedReturnDate, DEFAULT_DATE_FORMAT), {
        shouldValidate: true,
      });
    }
  };

  const handleReturnDateChange = (val: string) => {
    setValue("returnDate", val, { shouldValidate: true });
  };

  const handleGuestSelectionChange = (val: IGuestInfo) => {
    setValue("child", val.child ?? 0, { shouldValidate: true });
    setValue("adult", val.adult ?? 1, { shouldValidate: true });
    setValue("rooms", val.rooms ?? 1, { shouldValidate: true });
  };

  return {
    searchForm,
    departureDate,
    returnDate,
    onSubmit,
    handleDepartureDateChange,
    handleReturnDateChange,
    handleGuestSelectionChange,
  };
}
