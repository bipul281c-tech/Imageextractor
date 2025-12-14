import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Bulk Image Extractor - Extract All Images at Once",
    description: "Professional bulk image extractor for websites. Find and extract all images from any webpage with advanced filtering. Free web image extractor tool.",
    keywords: [
        "extract",
        "extractor",
        "bulk image extractor",
        "find this images",
        "image to url",
        "web image extractor",
        "extract images from website",
        "bulk extract images",
        "image finder"
    ],
    openGraph: {
        title: "Bulk Image Extractor - Extract All Images at Once",
        description: "Professional bulk image extractor for websites. Find and extract all images from any webpage with advanced filtering.",
        url: "https://extractpics.com/bulk-extractor",
        type: "website",
    },
    alternates: {
        canonical: "/bulk-extractor",
    },
}

export default function BulkExtractorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
