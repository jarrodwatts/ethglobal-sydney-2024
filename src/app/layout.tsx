"use client";

import { ThirdwebProvider } from "thirdweb/react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThirdwebProvider>
        <body>{children}</body>
        <Toaster />
      </ThirdwebProvider>
    </html>
  );
}
