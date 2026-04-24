import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppShift — Discover Newly Submitted Apps",
  description: "Fresh software discovered by the AppShift community. Browse, compare, and find your next favorite tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-page text-txt antialiased`}>
        {children}
      </body>
    </html>
  );
}
