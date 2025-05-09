"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { WalletProvider } from "@/components/providers/wallet-provider"
import ClientAuth from "@/components/ClientAuth"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <WalletProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <ClientAuth />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
