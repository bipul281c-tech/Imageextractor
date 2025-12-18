import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Find This Images - Hidden Image Finder & Extractor",
    description: "Looking for 'find this images' tool? Extract and find all images from any website URL instantly with our free image finder. Quick, easy, and free.",
    keywords: [
        "find this images",
        "find images",
        "image finder",
        "extract images from url",
        "find images on page",
        "website image finder",
        "hidden image extractor"
    ],
    openGraph: {
        title: "Find This Images - Hidden Image Finder & Extractor",
        description: "Extract and find all images from any website URL instantly with our free image finder.",
        url: "https://extractpics.com/find-this-images",
        type: "website",
    },
    alternates: {
        canonical: "/find-this-images",
    },
}

export default function FindThisImagesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
