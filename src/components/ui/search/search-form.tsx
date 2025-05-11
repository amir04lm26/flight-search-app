"use client";

import { Input } from "@components/shared/input/input.component";
import { Button } from "@components/shared/button/button.component";
import { DateInput } from "@components/shared/input/date/date-input.component";
import { useSearchForm } from "./use-search-form.hook";
import { GuestSelection } from "./guest-selection/guest-selection.component";

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
    <div className='max-w-2xl -mt-24 lg:-mt-32 relative z-2 mx-4 sm:mx-10 md:mx-auto p-6 bg-white shadow-lg rounded-lg'>
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

        <GuestSelection
          currentValues={{
            child: watch("child"),
            adult: watch("adult"),
            rooms: watch("rooms"),
          }}
          onChange={(values) => {
            setValue("child", values.child ?? 0, { shouldValidate: true });
            setValue("adult", values.adult ?? 1, { shouldValidate: true });
            setValue("rooms", values.rooms ?? 1, { shouldValidate: true });
          }}
          error={
            errors.child?.message ??
            errors.adult?.message ??
            errors.rooms?.message
          }
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <Button type='submit' fullWidth>
          Search Flights
        </Button>
      </form>
    </div>
  );
}
