import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Pic Link - Direct Picture URL & Link Extractor",
    description: "Get direct pic links and URLs from any website. Easy to use picture link extractor for developers and designers. Free and unlimited.",
    keywords: [
        "pic link",
        "picture link",
        "get image url",
        "image link extractor",
        "pic url finder",
        "direct image link",
        "extract links from pictures"
    ],
    openGraph: {
        title: "Pic Link - Direct Picture URL & Link Extractor",
        description: "Get direct pic links and URLs from any website with our free picture link extractor.",
        url: "https://extractpics.com/pic-link",
        type: "website",
    },
    alternates: {
        canonical: "/pic-link",
    },
}

export default function PicLinkLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
