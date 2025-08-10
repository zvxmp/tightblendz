import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import PageTransition from "@/components/layout/page-transition"
import BackgroundMusic from "@/components/layout/background-music"
import MouseTrail from "@/components/effects/mouse-trail"
import ParallaxBackground from "@/components/effects/parallax-background"
import { Suspense } from "react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Tight Blendz - Embrace Yourself With Clippers",
  description:
    "A sharp mind is just as important as a sharp blade—your mentality shapes every cut, every client, every success.",
  keywords: "tight blendz, barber shop, men's haircuts, beard trim, grooming, trap beats, barbershop",
  openGraph: {
    title: "Tight Blendz - Embrace Yourself With Clippers",
    description:
      "A sharp mind is just as important as a sharp blade—your mentality shapes every cut, every client, every success.",
    url: "https://tightblendz.com",
    siteName: "Tight Blendz",
    images: [
      {
        url: "https://tightblendz.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tight Blendz - Professional Barbershop",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tight Blendz - Embrace Yourself With Clippers",
    description:
      "A sharp mind is just as important as a sharp blade—your mentality shapes every cut, every client, every success.",
    images: ["https://tightblendz.com/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tightblendz.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <Suspense fallback={null}>
          <ParallaxBackground />
          <GoogleAnalytics />
          <PageTransition />
          <BackgroundMusic />
          <MouseTrail />
          <Header />
          <main className="relative z-10">{children}</main>
        </Suspense>
      </body>
    </html>
  )
}
