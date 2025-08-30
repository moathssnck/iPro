import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "IPro Info Professional - Advanced IP Address Lookup & Analysis Tool",
  description:
    "Professional IP address lookup tool providing comprehensive geolocation, ISP details, security analysis, and network information. Get detailed IP intelligence for cybersecurity, fraud prevention, and network analysis.",
  keywords: [
    "IP lookup",
    "IP address lookup",
    "geolocation",
    "IP geolocation",
    "IP information",
    "network analysis",
    "cybersecurity",
    "fraud prevention",
    "ISP lookup",
    "IP intelligence",
    "security analysis",
    "threat detection",
    "network security",
    "IP tracking",
    "location lookup",
    "ASN lookup",
    "BGP information",
    "IP reputation",
    "proxy detection",
    "VPN detection",
  ],
  authors: [{ name: "IP Info Professional" }],
  creator: "IP Info Professional",
  publisher: "IP Info Professional",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ip-info-professional.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IP Info Professional - Advanced IP Address Lookup & Analysis",
    description:
      "Professional IP address lookup tool with comprehensive geolocation, security analysis, and network intelligence. Perfect for cybersecurity professionals and network administrators.",
    url: "https://ip-info-professional.vercel.app",
    siteName: "IP Info Professional",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IP Info Professional - Advanced IP Lookup Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Info Professional - Advanced IP Address Lookup",
    description:
      "Professional IP lookup tool with comprehensive geolocation, security analysis, and network intelligence.",
    images: ["/twitter-image.png"],
    creator: "@ipinfopro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  applicationName: "IP Info Professional",
  appleWebApp: {
    capable: true,
    title: "IP Info Pro",
    statusBarStyle: "default",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#1f2937",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#1f2937",
    "theme-color": "#1f2937",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
