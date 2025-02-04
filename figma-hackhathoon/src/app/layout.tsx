import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Furniro - Modern Furniture Store",
  description: "Discover our collection of modern and stylish furniture for your home",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CartProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        </CartProvider>
      </body>
    </html>
  )
}

