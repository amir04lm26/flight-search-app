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
    departureDate,
    returnDate,
    onSubmit,
    handleDepartureDateChange,
    handleReturnDateChange,
    handleGuestSelectionChange,
  } = useSearchForm();

  return (
    <div className='max-w-2xl lg:max-w-3xl xl:max-w-11/12 -mt-24 lg:-mt-32 xl:-mt-32 relative z-2 mx-4 sm:mx-10 md:mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg rounded-lg'>
      <h2 className='text-2xl font-semibold mb-4'>Flight Search</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4 xl:space-y-0 xl:flex xl:space-x-4 xl:flex-wrap'>
        <div className='xl:flex-1'>
          <Input
            type='text'
            placeholder='Origin (IATA Code)'
            error={errors.origin?.message}
            {...register("origin", { required: "Origin is required" })}
          />
        </div>

        <div className='xl:flex-1'>
          <Input
            type='text'
            placeholder='Destination (IATA Code)'
            error={errors.destination?.message}
            {...register("destination", {
              required: "Destination is required",
            })}
          />
        </div>

        <div className='xl:flex-1'>
          <DateInput
            placeholder='Departure Date'
            value={departureDate}
            onChange={handleDepartureDateChange}
            error={errors.departureDate?.message}
          />
        </div>

        <div className='xl:flex-1'>
          <DateInput
            placeholder='Return Date'
            value={returnDate}
            minDate={new Date(departureDate)}
            onChange={handleReturnDateChange}
            error={errors.returnDate?.message}
          />
        </div>

        <div className='xl:flex-1'>
          <GuestSelection
            currentValues={{
              child: watch("child"),
              adults: watch("adults"),
              rooms: watch("rooms"),
            }}
            onChange={handleGuestSelectionChange}
            error={
              errors.child?.message ??
              errors.adults?.message ??
              errors.rooms?.message
            }
            errors={errors}
            setValue={setValue}
          />
        </div>

        <Button type='submit' fullWidth>
          Search Flights
        </Button>
      </form>
    </div>
  );
}
