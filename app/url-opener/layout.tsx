import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "URL Image Viewer & Extractor - View Images from Any URL",
    description: "Paste any URL to view and extract images. URL image viewer, pic URL finder, and picture URL extractor. Free online tool to open images from URLs.",
    keywords: [
        "url image",
        "url opener",
        "pic url",
        "picture url",
        "image to image url",
        "image url viewer",
        "open image url",
        "url image extractor",
        "paste url image"
    ],
    openGraph: {
        title: "URL Image Viewer & Extractor - View Images from Any URL",
        description: "Paste any URL to view and extract images. URL image viewer, pic URL finder, and picture URL extractor.",
        url: "https://extractpics.com/url-opener",
        type: "website",
    },
    alternates: {
        canonical: "/url-opener",
    },
}

export default function UrlOpenerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
