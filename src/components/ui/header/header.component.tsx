import Image from "next/image";
import AuthModal from "../auth-modal/auth-modal.component";
import { useSession } from "next-auth/react";
import { ProfileMenu } from "../profile/profile-menu.component";
import { AuthSkeleton } from "./header-skeleton.component";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className='bg-white dark:bg-gray-900 shadow-md dark:shadow-none h-16'>
      <div className='max-w-7xl mx-auto px-4 h-full flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Image
            src='/logo.svg'
            alt='Air Travel Co'
            width={32}
            height={32}
            className='w-auto h-8'
          />
          <span className='text-secondary dark:text-primary-light font-bold text-xl'>
            Air Travel Co
          </span>
        </div>

        <div className='h-10 flex items-center'>
          {status === "loading" ? (
            <AuthSkeleton />
          ) : (
            <>{session?.user ? <ProfileMenu /> : <AuthModal />}</>
          )}
        </div>
      </div>
    </header>
  );
}
