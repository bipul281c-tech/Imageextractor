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
    {
        slug: "facebook-image-downloader",
        title: "Download Facebook Photos & Images Free | Facebook Image Downloader",
        shortTitle: "Facebook Downloader",
        description: "Download photos and images from Facebook pages, profiles, and posts. Extract Facebook images in bulk with our free online tool.",
        keywords: ["facebook image downloader", "download facebook photos", "facebook photos download", "download images from facebook", "facebook downloader", "download all facebook photos"],
        icon: "Facebook",
        priority: 0.9,
    },
    {
        slug: "website-image-extractor",
        title: "Website Image Extractor - Extract All Images from Any Website",
        shortTitle: "Website Extractor",
        description: "Professional website image extractor. Extract all images from any webpage, portfolio, or website. Bulk download for designers and developers.",
        keywords: ["website image extractor", "extract images from website", "web image extractor", "website photo extractor", "download images from website"],
        icon: "Globe",
        priority: 0.9,
    },
    {
        slug: "download-image-from-link",
        title: "Download Images from Links & URLs | Batch Image URL Downloader",
        shortTitle: "Link Downloader",
        description: "Download images from direct links and URLs. Paste image URLs and download in bulk. Perfect for batch downloading images from link lists.",
        keywords: ["download image from link", "download images from links", "link image download", "download image by link", "download pictures from link"],
        icon: "Link",
        priority: 0.85,
    },
    {
        slug: "about",
        title: "About ExtractPics - Free Online Image Extraction Tool",
        shortTitle: "About",
        description: "Learn about ExtractPics, the leading free online tool for extracting and downloading images from any website. Fast, secure, and completely free.",
        keywords: ["about extractpics", "image extraction tool", "free image downloader", "about us"],
        icon: "Info",
        priority: 0.8,
    },
    {
        slug: "help",
        title: "Help & FAQ - ExtractPics Image Extraction Tool",
        shortTitle: "Help",
        description: "Get help with ExtractPics. Find answers to frequently asked questions about extracting and downloading images from websites.",
        keywords: ["help", "faq", "image extraction help", "troubleshooting", "how to use"],
        icon: "HelpCircle",
        priority: 0.75,
    },
    {
        slug: "pricing",
        title: "Pricing - ExtractPics is 100% Free Forever",
        shortTitle: "Pricing",
        description: "ExtractPics is completely free with unlimited image extractions. No hidden fees, no premium tiers, no subscriptions. Start extracting images now.",
        keywords: ["pricing", "free image downloader", "free extraction tool", "image extraction pricing"],
        icon: "DollarSign",
        priority: 0.85,
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
