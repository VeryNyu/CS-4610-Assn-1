import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ultimate Pokedex",
  description: "CS 4610 Assignment 1 - Ultimate Pokedex",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h2>Ultimate Pokedex</h2>
          <nav>
            <a href="/pokemon">Pokemon</a>
            <a href="/location">Locations</a>
            <a href="/move">Moves</a>
            <a href="/generation">Generations</a>
            </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}