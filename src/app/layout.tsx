import "@styles/globals.css";
import "@styles/react-calendar.override.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PropsWithChildren } from "react";
import Head from "next/head";
import ClientLayout from "./client-layout";
import clsx from "clsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Air | Book Flights, Trains, Buses & Hotels in Iran",
  description:
    "Book flight, train, and bus tickets or reserve hotels across Iran with Air. Enjoy 24/7 support, the best prices, and a trusted travel experience.",
  keywords:
    "Air Iran, flight tickets, train tickets, bus tickets, hotel booking, travel services, cheap tickets, Iran travel, travel booking",
  authors: [{ name: "Air Travel Services", url: "https://www.example.com" }],
  robots: "noindex, nofollow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          "max-w-7xl mx-auto"
        )}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
