"use client";

import { ThirdwebProvider } from "thirdweb/react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThirdwebProvider>
        <body>{children}</body>
      </ThirdwebProvider>
    </html>
  );
}
