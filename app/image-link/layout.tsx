import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Image Link Extractor - Get Image URLs from Any Webpage",
    description: "Extract image links and URLs from any website. Copy image URLs for embedding, sharing, or development. Free online image link extractor tool.",
    keywords: [
        "image link",
        "images link",
        "link image",
        "image links",
        "image urls",
        "image url extractor",
        "get image link",
        "copy image url",
        "image link finder"
    ],
    openGraph: {
        title: "Image Link Extractor - Get Image URLs from Any Webpage",
        description: "Extract image links and URLs from any website. Copy image URLs for embedding, sharing, or development.",
        url: "https://extractpics.com/image-link",
        type: "website",
    },
    alternates: {
        canonical: "/image-link",
    },
}

export default function ImageLinkLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
