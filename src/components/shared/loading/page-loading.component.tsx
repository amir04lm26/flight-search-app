export function PageLoading() {
  return (
    <div
      data-testid='page-loading'
      className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/40 dark:bg-gray-900/40 animate-fade-in'>
      <div className='flex flex-col items-center gap-4 p-6 bg-white/90 dark:bg-gray-800/90 shadow-card rounded-xl border border-gray-200 dark:border-gray-700'>
        <svg
          className='w-8 h-8 animate-spin text-primary dark:text-primary-light'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8v8z'
          />
        </svg>
        <span className='text-sm text-gray-500 dark:text-gray-300 font-medium'>
          Loading, please wait...
        </span>
      </div>
    </div>
  );
}
