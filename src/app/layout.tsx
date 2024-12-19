import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Instinctive Studio",
  description: "Instinctive Studio Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito_sans.className} antialiased`}>
        <StoreProvider>
          <Suspense>{children}</Suspense>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
