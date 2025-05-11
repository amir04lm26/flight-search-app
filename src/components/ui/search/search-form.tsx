"use client";

import { Input } from "@components/shared/input/input.component";
import { Button } from "@components/shared/button/button.component";
import { DateInput } from "@components/shared/input/date/date-input.component";
import { useSearchForm } from "./use-search-form.hook";

export function SearchForm() {
  const {
    searchForm: {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
    },
    onSubmit,
  } = useSearchForm();

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-2xl font-semibold mb-4'>Flight Search</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Input
          type='text'
          placeholder='Origin (IATA Code)'
          error={errors.origin?.message}
          {...register("origin", { required: "Origin is required" })}
        />

        <Input
          type='text'
          placeholder='Destination (IATA Code)'
          error={errors.destination?.message}
          {...register("destination", { required: "Destination is required" })}
        />

        <DateInput
          selectRange
          value={
            watch("departureDate") && watch("returnDate")
              ? `${watch("departureDate")} to ${watch("returnDate")}`
              : watch("departureDate")
          }
          onChange={(val) => {
            const [start, end] = val.split(" to ");
            setValue("departureDate", start, { shouldValidate: true });
            setValue("returnDate", end || "", { shouldValidate: true });
          }}
          error={errors.departureDate?.message ?? errors.returnDate?.message}
        />

        <Input
          type='number'
          placeholder='Children'
          error={errors.child?.message}
          {...register("child", {
            required: "Children count is required",
            min: { value: 0, message: "At least 0 children" },
          })}
        />

        <Input
          type='number'
          placeholder='Adults'
          error={errors.adult?.message}
          {...register("adult", {
            required: "Adults count is required",
            min: { value: 1, message: "At least 1 adult" },
          })}
        />

        <Input
          type='number'
          placeholder='Rooms'
          error={errors.rooms?.message}
          {...register("rooms", {
            required: "Room count is required",
            min: { value: 1, message: "At least 1 room" },
          })}
        />

        <Button type='submit' fullWidth>
          Search Flights
        </Button>
      </form>
    </div>
  );
}
