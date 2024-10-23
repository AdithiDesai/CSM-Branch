import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import React from "react";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Branch Support Chat",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={[nunito.className, "h-screen"].join("")}>
        {children}
      </body>
    </html>
  );
}
