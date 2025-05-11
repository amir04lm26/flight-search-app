import { SearchForm } from "@components/ui/search/search-form";
import { TopBanner } from "@components/ui/top-banner/top-banner.component";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback='loading...'>
      <TopBanner />
      <SearchForm />

      <div className='container mx-auto px-4 py-6'>
        <div className='bg-white dark:bg-gray-900 shadow-card rounded-md p-6'>
          <h2 className='text-xl font-display text-gray-900 dark:text-gray-100 mb-2'>
            Flight to Tokyo
          </h2>
          <p className='text-gray-500 dark:text-gray-400'>
            Departure: 10:00 AM
          </p>
          <span className='text-primary font-semibold dark:text-primary-light'>
            From $420
          </span>
        </div>
      </div>
    </Suspense>
  );
}
