import "@styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { Header } from "@components/ui/header/header.component";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alibaba | Book Flights, Trains, Buses & Hotels in Iran",
  description:
    "Book flight, train, and bus tickets or reserve hotels across Iran with Alibaba. Enjoy 24/7 support, the best prices, and a trusted travel experience.",
  keywords:
    "Alibaba Iran, flight tickets, train tickets, bus tickets, hotel booking, travel services, cheap tickets, Iran travel, travel booking",
  authors: [
    { name: "Alibaba Travel Services", url: "https://www.example.com" },
  ],
  robots: "noindex, nofollow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main className='mt-1'>{children}</main>
      </body>
    </html>
  );
}
