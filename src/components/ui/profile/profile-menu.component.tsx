"use client";

import { signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { Button } from "@components/shared/button/button.component";
import Image from "next/image";
import { useClickAway } from "react-use";

export function ProfileMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickAway(menuRef, () => setIsOpen(false));

  if (!session) return null;

  const userName = session.user?.name ?? session.user?.email;
  const firstLetter = userName?.charAt(0).toUpperCase();
  const fallbackInitials =
    firstLetter && /^[a-zA-Z]$/.test(firstLetter) ? firstLetter : "AT";

  const avatar =
    session.user?.image ??
    `https://ui-avatars.com/api/?background=E08C00&color=ffffff&name=${fallbackInitials}`;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div ref={menuRef} className='relative'>
      <Button
        onClick={toggleMenu}
        variant='text'
        className='flex items-center gap-2 text-sm h-10'>
        <Image
          src={avatar}
          alt='User Avatar'
          width={32}
          height={32}
          className='rounded-full'
        />
        <span className='hidden sm:inline truncate max-w-[120px]'>
          {userName ?? "User"}
        </span>
      </Button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-50 animate-fade-in'>
          <div className='px-4 py-2 text-sm text-gray-700 dark:text-gray-200'>
            <div className='flex items-center gap-3'>
              <Image
                src={avatar}
                alt='User Avatar'
                width={40}
                height={40}
                className='rounded-full object-cover'
              />
              <div>
                <p className='font-medium'>{session.user?.name}</p>
                <p className='text-xs'>{session.user?.email}</p>
              </div>
            </div>
          </div>
          <hr className='my-2 border-gray-200 dark:border-gray-700' />
          <button
            onClick={() => signOut()}
            className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700'>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
