"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/Providers";
import { ReduxProvider } from "@/redux/ReduxProvider"; // Import Redux provider

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider> {/* Wrap with ReduxProvider */}
          <Providers> {/* Wrap with ClerkProvider */}
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
