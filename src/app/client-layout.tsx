"use client";

import { SessionProvider } from "next-auth/react";
import { Header } from "@components/ui/header/header.component";
import { PropsWithChildren } from "react";

export default function ClientLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <SessionProvider>
      <Header />
      <main className='mt-1'>{children}</main>
    </SessionProvider>
  );
}
