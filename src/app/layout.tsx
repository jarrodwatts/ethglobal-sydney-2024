"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThirdwebProvider>
        <body className={inter.className}>{children}</body>
      </ThirdwebProvider>
    </html>
  );
}
