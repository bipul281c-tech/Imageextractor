import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Free Image Downloader - Download Images from Any Website",
    description: "Download images from any website instantly. Paste a URL, scan for images, and bulk download with our free online image downloader tool. No signup required.",
    keywords: [
        "image downloader",
        "download images from website",
        "bulk image downloader",
        "paste downloader",
        "prompty image download",
        "free image downloader",
        "website image downloader",
        "batch image download"
    ],
    openGraph: {
        title: "Free Image Downloader - Download Images from Any Website",
        description: "Download images from any website instantly. Paste a URL, scan for images, and bulk download with our free online image downloader tool.",
        url: "https://extractpics.com/image-downloader",
        type: "website",
    },
    alternates: {
        canonical: "/image-downloader",
    },
}

export default function ImageDownloaderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
