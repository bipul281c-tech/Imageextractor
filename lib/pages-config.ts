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
    // Batch 1 SEO Pages
    {
        slug: "find-this-images",
        title: "Find This Images - Hidden Image Finder & Extractor",
        shortTitle: "Find This Images",
        description: "Looking for 'find this images' tool? Extract and find all images from any website URL instantly with our free image finder.",
        keywords: ["find this images", "find images", "image finder", "extract images from url"],
        icon: "Globe",
        priority: 0.8,
    },
    {
        slug: "pic-link",
        title: "Pic Link - Direct Picture URL & Link Extractor",
        shortTitle: "Pic Link",
        description: "Get direct pic link and URLs from any website. Easy to use picture link extractor for developers and designers.",
        keywords: ["pic link", "picture link", "get image url", "image link extractor"],
        icon: "Link2",
        priority: 0.8,
    },
    {
        slug: "link-picture",
        title: "Link Picture - Get Direct URLs for Every Image",
        shortTitle: "Link Picture",
        description: "Need to link picture or find direct URLs? Extract every image link from any webpage with our free online tool.",
        keywords: ["link picture", "picture link", "image url", "link images"],
        icon: "Link",
        priority: 0.8,
    },
    {
        slug: "images-and-links",
        title: "Images and Links - Bulk Image & URL Extractor",
        shortTitle: "Images & Links",
        description: "Extract both images and links from any website. Bulk download images and copy their direct URLs in one go.",
        keywords: ["images and links", "image URLs", "bulk image extract", "link finder"],
        icon: "Layers",
        priority: 0.8,
    },
    {
        slug: "image-and-link",
        title: "Image and Link - Get Image URLs Instantly",
        shortTitle: "Image & Link",
        description: "Find the image and link for any picture on a website. Direct URL extraction and preview for all webpage images.",
        keywords: ["image and link", "image link", "picture url", "get image link"],
        icon: "ExternalLink",
        priority: 0.8,
    },
    // Batch 2 SEO Pages
    {
        slug: "image-to-image-url",
        title: "Image to Image URL - Convert Images to Direct URLs Free",
        shortTitle: "Image to URL",
        description: "Convert any image on a website to a direct image URL. Simple extraction and link generation for every picture found on a webpage.",
        keywords: ["image to image url", "image to url", "get image link", "picture url"],
        icon: "Link2",
        priority: 0.8,
    },
    {
        slug: "image-to-url",
        title: "Image to URL Converter - Get Direct Image Links Instantly",
        shortTitle: "Image to URL",
        description: "Free online tool to convert images to URLs. Scan any website and get direct links for every image, photo, and picture instantly.",
        keywords: ["image to url", "image url converter", "get url from image", "picture url link"],
        icon: "ExternalLink",
        priority: 0.8,
    },
    {
        slug: "image-saver",
        title: "Image Saver - Save Any Image from Any Website for Free",
        shortTitle: "Image Saver",
        description: "Looking for a free image saver? Easily save and download any image from any website with our bulk image extraction tool.",
        keywords: ["image saver", "save images", "download images", "web image saver"],
        icon: "Download",
        priority: 0.8,
    },
    {
        slug: "download-image",
        title: "Download Image - Free Online Image Downloader Tool",
        shortTitle: "Download Image",
        description: "Download any image from any website instantly. Paste the URL and download images in bulk or individually with our free downloader.",
        keywords: ["download image", "image download", "bulk image download", "free downloader"],
        icon: "Download",
        priority: 0.8,
    },
    {
        slug: "save-image",
        title: "Save Image - Easily Save Pictures from Any Webpage",
        shortTitle: "Save Image",
        description: "Save images from any webpage for free. Our tool helps you extract and save all pictures from a URL in high resolution.",
        keywords: ["save image", "save picture", "download photos", "image extraction"],
        icon: "Layers",
        priority: 0.8,
    },
    // Batch 3 SEO Pages
    {
        slug: "photos-saver",
        title: "Photos Saver - Best Way to Save All Photos from Websites",
        shortTitle: "Photos Saver",
        description: "Looking for a photos saver? Easily save all photos, pictures, and images from any website URL for free with our powerful extraction tool.",
        keywords: ["photos saver", "save photos", "website photo saver", "download all photos"],
        icon: "Download",
        priority: 0.8,
    },
    {
        slug: "photo-saver",
        title: "Photo Saver - Save Any Photo from Any Webpage Instantly",
        shortTitle: "Photo Saver",
        description: "The best photo saver tool online. Paste any URL to find and save every photo from the website. Quick, easy, and completely free.",
        keywords: ["photo saver", "save photo", "download photo", "web photo saver"],
        icon: "Download",
        priority: 0.8,
    },
    {
        slug: "image-downloader-free",
        title: "Image Downloader Free - Unlimited Bulk Image Downloads",
        shortTitle: "Free Downloader",
        description: "Fast and reliable image downloader free of charge. Extract and download unlimited images from any website in high quality.",
        keywords: ["image downloader free", "free image download", "bulk image downloader", "no-cost downloader"],
        icon: "Download",
        priority: 0.8,
    },
    {
        slug: "extraction-tool",
        title: "Extraction Tool - Ultimate Web Image & Data Extractor",
        shortTitle: "Extraction Tool",
        description: "Advanced extraction tool for images. Scan any website and extract all visual content including hidden images and background graphics.",
        keywords: ["extraction tool", "image extractor", "web extraction", "content extractor"],
        icon: "Zap",
        priority: 0.8,
    },
    {
        slug: "extractor-tool",
        title: "Extractor Tool - Extract Images from Any URL Quickly",
        shortTitle: "Extractor Tool",
        description: "Easy to use extractor tool for website images. Paste a link and let our tool find every image, icon, and photo for you to download.",
        keywords: ["extractor tool", "link extractor", "image finder tool", "web extractor"],
        icon: "Search",
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
