import { ImageData } from './types/scraper';

/**
 * Extract image URLs from HTML content and links array
 * @param html - Raw HTML content from the scraped page
 * @param links - Array of links found on the page
 * @param baseUrl - Base URL for resolving relative paths
 * @returns Array of ImageData objects
 */
export function parseImagesFromContent(
    html: string | undefined,
    links: string[] | undefined,
    baseUrl: string
): ImageData[] {
    const imageUrls = new Set<string>();

    // Extract from links array (Firecrawl often returns image URLs here)
    if (links && Array.isArray(links)) {
        links.forEach(link => {
            if (isImageUrl(link)) {
                imageUrls.add(resolveUrl(link, baseUrl));
            }
        });
    }

    // Extract from HTML img tags
    if (html) {
        const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
        let match;
        while ((match = imgRegex.exec(html)) !== null) {
            const src = match[1];
            if (src && !src.startsWith('data:')) {
                imageUrls.add(resolveUrl(src, baseUrl));
            }
        }

        // Extract from srcset attributes
        const srcsetRegex = /srcset=["']([^"']+)["']/gi;
        while ((match = srcsetRegex.exec(html)) !== null) {
            const srcset = match[1];
            srcset.split(',').forEach(entry => {
                const url = entry.trim().split(/\s+/)[0];
                if (url && isImageUrl(url) && !url.startsWith('data:')) {
                    imageUrls.add(resolveUrl(url, baseUrl));
                }
            });
        }

        // Extract from CSS background-image
        const bgRegex = /background(?:-image)?:\s*url\(['"]?([^'")]+)['"]?\)/gi;
        while ((match = bgRegex.exec(html)) !== null) {
            const url = match[1];
            if (url && isImageUrl(url) && !url.startsWith('data:')) {
                imageUrls.add(resolveUrl(url, baseUrl));
            }
        }
    }

    // Convert to ImageData array
    return Array.from(imageUrls).map((src, index) => ({
        id: index + 1,
        src,
        name: extractFilename(src),
        dimensions: 'Unknown',
        size: 'Unknown',
        defaultChecked: true,
    }));
}

/**
 * Convert image URLs array from Image Scraper API to ImageData format
 * @param urls - Array of image URLs from the scraper API
 * @returns Array of ImageData objects (deduplicated)
 */
export function convertImageUrls(urls: string[]): ImageData[] {
    // Deduplicate URLs using Set 
    // Also normalize URLs to catch near-duplicates (same image, different query params)
    const seen = new Set<string>();
    const uniqueUrls: string[] = [];

    for (const url of urls) {
        // Normalize: remove trailing slashes and common tracking params
        const normalizedUrl = normalizeImageUrl(url);

        if (!seen.has(normalizedUrl)) {
            seen.add(normalizedUrl);
            uniqueUrls.push(url); // Keep original URL
        }
    }

    return uniqueUrls.map((src, index) => ({
        id: index + 1,
        src,
        name: extractFilename(src),
        dimensions: 'Unknown',
        size: 'Unknown',
        defaultChecked: true,
    }));
}

/**
 * Normalize image URL for deduplication comparison
 * Removes common variations that point to the same image
 */
function normalizeImageUrl(url: string): string {
    try {
        const urlObj = new URL(url);

        // Get base path without query string for comparison
        // This catches cases where same image has different cache-busting params
        const basePath = `${urlObj.origin}${urlObj.pathname}`;

        // Also remove common size suffixes like _150x150, -300x300
        // But keep the core URL for deduplication
        return basePath.toLowerCase().replace(/\/$/, '');
    } catch {
        return url.toLowerCase().replace(/\/$/, '');
    }
}

/**
 * Check if a URL points to an image file
 */
function isImageUrl(url: string): boolean {
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif|tiff?)(\?.*)?$/i;
    const imagePatterns = /images?|photo|img|media|cdn|static/i;

    return imageExtensions.test(url) || imagePatterns.test(url);
}

/**
 * Resolve a potentially relative URL against a base URL
 */
function resolveUrl(url: string, baseUrl: string): string {
    try {
        // Already absolute
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        // Protocol-relative
        if (url.startsWith('//')) {
            return `https:${url}`;
        }
        // Relative path
        const base = new URL(baseUrl);
        return new URL(url, base).href;
    } catch {
        return url;
    }
}

/**
 * Extract a filename from a URL
 */
function extractFilename(url: string): string {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.split('/').pop() || 'image';

        // Clean up query params from filename
        const cleanName = filename.split('?')[0];

        // If no extension, add a generic one
        if (!cleanName.includes('.')) {
            return `${cleanName}.jpg`;
        }

        return cleanName;
    } catch {
        return 'image.jpg';
    }
}
