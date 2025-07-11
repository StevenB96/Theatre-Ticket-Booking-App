// src/app/layout.tsx

import { ReactNode } from 'react';
import { Geist, Geist_Mono, Source_Sans_3, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

interface RootLayoutProps {
  children: ReactNode;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Book Theatre Tickets Online | Plays, Musicals & Shows Near You",
  description:
    "Buy theatre tickets online for top musicals, plays, and live shows. Browse showtimes, reviews, and seating plans. Instant booking. No hidden fees.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
      <body className={
        `${geistSans.variable} 
        ${geistMono.variable} 
        ${sourceSans3.variable} 
        ${playfair.variable}
        `}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
