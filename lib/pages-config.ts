// Centralized page configuration for SEO and internal linking
export interface PageConfig {
    slug: string
    title: string
    shortTitle: string
    description: string
    keywords: string[]
    icon: string // Lucide icon name
    priority: number // Sitemap priority
}

export const siteConfig = {
    name: "ExtractPics",
    url: "https://extractpics.com",
    description: "ExtractPics is a free online tool for bulk downloading images from any website. Preview, filter by size/format, and download instantly. No login needed.",
}

export const pages: PageConfig[] = [
    {
        slug: "",
        title: "Extract Images from Websites Free | Bulk Download Tool",
        shortTitle: "Home",
        description: siteConfig.description,
        keywords: ["image extractor", "bulk image downloader", "website image grabber"],
        icon: "Home",
        priority: 1.0,
    },
    {
        slug: "image-downloader",
        title: "Free Image Downloader - Download Images from Any Website",
        shortTitle: "Image Downloader",
        description: "Download images from any website instantly. Paste a URL, scan for images, and bulk download with our free online image downloader tool.",
        keywords: ["image downloader", "download images", "paste downloader", "bulk download"],
        icon: "Download",
        priority: 0.9,
    },
    {
        slug: "image-link",
        title: "Image Link Extractor - Get Image URLs from Any Webpage",
        shortTitle: "Image Links",
        description: "Extract image links and URLs from any website. Copy image URLs for embedding, sharing, or development.",
        keywords: ["image link", "images link", "image urls", "copy image url"],
        icon: "Link2",
        priority: 0.9,
    },
    {
        slug: "bulk-extractor",
        title: "Bulk Image Extractor - Extract All Images at Once",
        shortTitle: "Bulk Extractor",
        description: "Professional bulk image extractor for websites. Find and extract all images from any webpage with advanced filtering.",
        keywords: ["extract", "extractor", "bulk extract", "find images"],
        icon: "Layers",
        priority: 0.9,
    },
    {
        slug: "url-opener",
        title: "URL Image Viewer & Extractor - View Images from Any URL",
        shortTitle: "URL Opener",
        description: "Paste any URL to view and extract images. URL image viewer, pic URL finder, and picture URL extractor.",
        keywords: ["url image", "pic url", "picture url", "url opener"],
        icon: "ExternalLink",
        priority: 0.9,
    },
    {
        slug: "video-downloader",
        title: "Video Thumbnail & Image Extractor",
        shortTitle: "Video Thumbnails",
        description: "Extract thumbnails, preview frames, and all images from video pages. Get images from YouTube, Vimeo, and any video hosting site.",
        keywords: ["video download", "thumbnail downloader", "video thumbnail"],
        icon: "Film",
        priority: 0.8,
    },
]

// Get all pages except a specific one (for related links)
export function getRelatedPages(currentSlug: string): PageConfig[] {
    return pages.filter(page => page.slug !== currentSlug)
}

// Get page by slug
export function getPageBySlug(slug: string): PageConfig | undefined {
    return pages.find(page => page.slug === slug)
}

// Get sitemap entries
export function getSitemapEntries() {
    return pages.map(page => ({
        url: `${siteConfig.url}${page.slug ? `/${page.slug}` : ""}`,
        priority: page.priority,
    }))
}
