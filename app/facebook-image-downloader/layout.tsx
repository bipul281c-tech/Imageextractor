import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Download Facebook Photos & Images Free | Facebook Image Downloader",
    description: "Download photos and images from Facebook pages, profiles, and posts. Extract Facebook images in bulk with our free online tool. No login required.",
    keywords: [
        "facebook image downloader",
        "download facebook photos",
        "facebook photos download",
        "download images from facebook",
        "facebook downloader",
        "download all facebook photos",
        "facebook photos downloader",
        "how to download facebook photos",
        "download facebook images",
        "facebook photo downloader"
    ],
    openGraph: {
        title: "Download Facebook Photos & Images Free | Facebook Image Downloader",
        description: "Download photos and images from Facebook pages, profiles, and posts. Extract Facebook images in bulk with our free online tool.",
        url: "https://extractpics.com/facebook-image-downloader",
        type: "website",
    },
    alternates: {
        canonical: "/facebook-image-downloader",
    },
}

export default function FacebookImageDownloaderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
