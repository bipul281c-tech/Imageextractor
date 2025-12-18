import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Images and Links - Bulk Image & URL Extractor",
    description: "Extract both images and links from any website instantly. Bulk download images and copy their direct URLs in one place. Free online tool.",
    keywords: [
        "images and links",
        "image URLs",
        "bulk image extract",
        "link finder",
        "extract links from website",
        "get image and links",
        "image link downloader"
    ],
    openGraph: {
        title: "Images and Links - Bulk Image & URL Extractor",
        description: "Extract both images and links from any website instantly with our free online tool.",
        url: "https://extractpics.com/images-and-links",
        type: "website",
    },
    alternates: {
        canonical: "/images-and-links",
    },
}

export default function ImagesAndLinksLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
