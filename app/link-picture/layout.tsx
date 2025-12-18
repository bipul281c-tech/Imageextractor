import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Link Picture - Get Direct URLs for Every Image",
    description: "Need to link pictures or find direct URLs? Extract every image link from any webpage with our free online tool. Reliable and easy to use.",
    keywords: [
        "link picture",
        "picture link",
        "image url",
        "link images",
        "how to link pictures",
        "get picture links",
        "extract image URLs"
    ],
    openGraph: {
        title: "Link Picture - Get Direct URLs for Every Image",
        description: "Extract every image link from any webpage with our free online tool.",
        url: "https://extractpics.com/link-picture",
        type: "website",
    },
    alternates: {
        canonical: "/link-picture",
    },
}

export default function LinkPictureLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
