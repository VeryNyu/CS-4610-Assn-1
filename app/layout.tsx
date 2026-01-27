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
        <header className="app-header">
          <h2>Ultimate Pokedex</h2>
          <nav className="nav-tabs">
            <a href="/pokemon" className="nav-tab">Pokemon</a>
            <a href="/location" className="nav-tab">Locations</a>
            <a href="/move" className="nav-tab">Moves</a>
            <a href="/generation" className="nav-tab">Generations</a>
            </nav>
        </header>
        <main className="page-container">{children}</main>
      </body>
    </html>
  );
}