import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

// Site configuration
const siteConfig = {
  name: "ExtractPics",
  description: "ExtractPics is a free online tool for bulk downloading images from any website. Preview, filter by size/format, and download instantly. No login needed.",
  url: "https://extractpics.com",
  ogImage: "/opengraph-image.png",
}

export const metadata: Metadata = {
  // Basic Meta Tags
  title: {
    default: "Extract Images from Websites Free | Bulk Download Tool",
    template: "%s | ExtractPics"
  },
  description: siteConfig.description,
  keywords: [
    "image extractor",
    "image scraper",
    "download images from website",
    "bulk image downloader",
    "website image grabber",
    "extract pictures online",
    "batch image download",
    "image grabber tool",
    "web image scraper",
    "free image downloader",
    "image downloader",
    "image link",
    "images link",
    "link image",
    "url image",
    "pic url",
    "picture url",
    "extract",
    "extractor",
    "paste downloader",
    "image to url",
    "image urls",
    "find this images",
    "video thumbnail downloader"
  ],
  authors: [{ name: "ExtractPics", url: siteConfig.url }],
  creator: "ExtractPics",
  publisher: "ExtractPics",
  generator: "Next.js",

  // Base URL for resolving relative URLs
  metadataBase: new URL(siteConfig.url),

  // Canonical URL
  alternates: {
    canonical: "/",
  },

  // Open Graph for social sharing (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Extract Images from Websites Free | Bulk Download Tool",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "ExtractPics - Extract images from any website",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Extract Images from Websites Free | Bulk Download Tool",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@extractpics",
  },

  // Robots directives
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

  // App-specific icons (Google requires minimum 48x48 for search results)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  // Verification (add your verification codes when ready)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Category
  category: "technology",
}

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
}

// JSON-LD Structured Data - WebSite Schema (enables sitelinks searchbox)
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ExtractPics",
  "alternateName": ["Extract Pics", "ExtractPics.com"],
  "url": siteConfig.url,
  "description": siteConfig.description,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteConfig.url}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
}

// JSON-LD Structured Data - WebApplication Schema
const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ExtractPics",
  "url": siteConfig.url,
  "description": siteConfig.description,
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Bulk image download from any website",
    "Filter images by format (JPG, PNG, WebP, GIF, SVG)",
    "Filter images by minimum width",
    "Download all images as ZIP",
    "No registration required",
    "Free to use"
  ],
  "screenshot": `${siteConfig.url}/opengraph-image.png`,
}

// JSON-LD Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ExtractPics",
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/logo.png`,
  "sameAs": [],
  "description": siteConfig.description
}

// JSON-LD SiteNavigationElement Schema (tells Google about main navigation links for sitelinks)
const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SiteNavigationElement",
      "name": "Image Downloader",
      "description": "Download images from any website instantly with our free image downloader tool.",
      "url": `${siteConfig.url}/image-downloader`
    },
    {
      "@type": "SiteNavigationElement",
      "name": "Image Links",
      "description": "Extract image links and URLs from any website for embedding or sharing.",
      "url": `${siteConfig.url}/image-link`
    },
    {
      "@type": "SiteNavigationElement",
      "name": "Bulk Extractor",
      "description": "Professional bulk image extractor for websites with advanced filtering.",
      "url": `${siteConfig.url}/bulk-extractor`
    },
    {
      "@type": "SiteNavigationElement",
      "name": "URL Opener",
      "description": "Paste any URL to view and extract images from any webpage.",
      "url": `${siteConfig.url}/url-opener`
    },
    {
      "@type": "SiteNavigationElement",
      "name": "Video Thumbnails",
      "description": "Extract thumbnails and preview frames from video pages.",
      "url": `${siteConfig.url}/video-downloader`
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data - WebSite (enables sitelinks searchbox) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        {/* JSON-LD Structured Data - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        {/* JSON-LD Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* JSON-LD Structured Data - SiteNavigationElement (for Google sitelinks) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
