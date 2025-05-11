import { format, isBefore, parseISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { SearchFormData } from "./search.model";
import { useEffect } from "react";

export function useSearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");

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
  const { setValue } = searchForm;

  const onSubmit = async (data: SearchFormData) => {
    const query = new URLSearchParams({
      origin: data.origin,
      destination: data.destination,
      departureDate: data.departureDate,
      returnDate: data.returnDate ?? "",
      child: data.child.toString(),
      adult: data.adult.toString(),
      rooms: data.rooms.toString(),
    });

    router.push(`?${query.toString()}`);
  };

  useEffect(() => {
    // Sync form values with query string (in case of external change)
    setValue("departureDate", defaultDeparture);
    setValue("returnDate", defaultReturn);
  }, [defaultDeparture, defaultReturn, setValue]);

  return {
    searchForm,
    onSubmit,
  };
}
