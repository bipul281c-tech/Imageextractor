import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Website Image Extractor - Extract All Images from Any Website",
    description: "Professional website image extractor. Extract all images from any webpage, portfolio, or website. Bulk download for designers and developers. Free online tool.",
    keywords: [
        "website image extractor",
        "extract images from website",
        "web image extractor",
        "website photo extractor",
        "download images from website",
        "website image downloader",
        "extract image from website",
        "web page image downloader",
        "site image downloader"
    ],
    openGraph: {
        title: "Website Image Extractor - Extract All Images from Any Website",
        description: "Professional website image extractor. Extract all images from any webpage, portfolio, or website. Bulk download for designers and developers.",
        url: "https://extractpics.com/website-image-extractor",
        type: "website",
    },
    alternates: {
        canonical: "/website-image-extractor",
    },
}

export default function WebsiteImageExtractorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
