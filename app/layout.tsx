import type React from "react"
import type { Metadata } from "next"
import { Inter, Libre_Baskerville } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
})

export const metadata: Metadata = {
  title: "Factory Relo | Manufacturing Relocation Services & Tariff Mitigation",
  description:
    "Expert factory relocation consultants helping manufacturing companies navigate tariff uncertainty, minimize production interruption, and optimize supply chain relocation costs.",
  keywords:
    "manufacturing relocation services, factory relocation consultant, tariff mitigation strategies, reshoring consultant, supply chain relocation, consumer goods reshoring",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17009912454" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17009912454');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${libreBaskerville.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div className="p-4">Loading...</div>}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
