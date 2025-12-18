import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Image and Link - Get Image URLs Instantly",
    description: "Find the image and link for any picture on a website. Direct URL extraction and preview for all webpage images in one click. Free and easy.",
    keywords: [
        "image and link",
        "image link",
        "picture url",
        "get image link",
        "find image source",
        "image URL extractor",
        "extract links for pictures"
    ],
    openGraph: {
        title: "Image and Link - Get Image URLs Instantly",
        description: "Find the image and link for any picture on a website with our free online tool.",
        url: "https://extractpics.com/image-and-link",
        type: "website",
    },
    alternates: {
        canonical: "/image-and-link",
    },
}

export default function ImageAndLinkLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
