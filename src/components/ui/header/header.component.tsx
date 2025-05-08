import AuthModal from "../auth-modal/auth-modal.component";

export function Header() {
  return (
    <header className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <img src='/logo.svg' alt='Air Travel Co' className='h-8 w-auto' />
          <span className='text-secondary font-bold text-xl'>
            Air Travel Co
          </span>
        </div>
        <AuthModal />
      </div>
    </header>
  );
}
