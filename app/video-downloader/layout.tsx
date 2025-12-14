import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Video & Image Downloader - Extract Media from Any Website",
    description: "Looking for a video downloader? ExtractPics specializes in image extraction from any website. Download images, thumbnails, and preview frames from video pages.",
    keywords: [
        "video download from any website",
        "video downloader from any website",
        "video downloader any website",
        "media downloader",
        "thumbnail downloader",
        "video thumbnail extractor",
        "image from video",
        "video frame extractor"
    ],
    openGraph: {
        title: "Video & Image Downloader - Extract Media from Any Website",
        description: "Looking for a video downloader? ExtractPics specializes in image extraction. Download images, thumbnails, and preview frames.",
        url: "https://extractpics.com/video-downloader",
        type: "website",
    },
    alternates: {
        canonical: "/video-downloader",
    },
}

export default function VideoDownloaderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
