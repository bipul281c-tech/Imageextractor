import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Download Images from Links & URLs | Batch Image URL Downloader",
    description: "Download images from direct links and URLs. Paste image URLs and download in bulk. Perfect for batch downloading images from link lists. Free online tool.",
    keywords: [
        "download image from link",
        "download images from links",
        "link image download",
        "download image by link",
        "download pictures from link",
        "image downloader link",
        "download images by link",
        "link picture downloader",
        "download picture from link"
    ],
    openGraph: {
        title: "Download Images from Links & URLs | Batch Image URL Downloader",
        description: "Download images from direct links and URLs. Paste image URLs and download in bulk. Perfect for batch downloading images from link lists.",
        url: "https://extractpics.com/download-image-from-link",
        type: "website",
    },
    alternates: {
        canonical: "/download-image-from-link",
    },
}

export default function DownloadImageFromLinkLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
