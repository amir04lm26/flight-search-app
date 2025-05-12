"use client";

import { ReactElement } from "react";

type PageMessageProps = Readonly<{
  type?: "error" | "empty" | "info";
  message: string;
}>;

export function PageMessage({ type = "info", message }: PageMessageProps) {
  const icons: Record<string, ReactElement> = {
    error: (
      <svg
        className='w-6 h-6 text-danger'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.64-1.14 1.053-2.053L13.053 4.947c-.586-.913-1.52-.913-2.106 0L4.03 16.947C3.444 17.86 4.03 19 5.084 19z'
        />
      </svg>
    ),
    empty: (
      <svg
        className='w-6 h-6 text-gray-400 dark:text-gray-500'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM21 12a9 9 0 11-18 0 9 9 0 0118 0zM8.625 15.75a4.5 4.5 0 016.75 0'
        />
      </svg>
    ),
    info: (
      <svg
        className='w-6 h-6 text-blue dark:text-blue-light'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z'
        />
      </svg>
    ),
  };

  return (
    <section className='w-full flex justify-center my-8 px-4'>
      <div className='flex items-center gap-3 p-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg max-w-md w-full'>
        {icons[type]}
        <span className='text-sm text-gray-700 dark:text-gray-300 font-medium'>
          {message}
        </span>
      </div>
    </section>
  );
}
