import { ImageData } from './types/scraper';

/**
 * Result of image deduplication
 */
export interface DeduplicationResult {
    uniqueImages: ImageData[];
    duplicatesRemoved: number;
}

/**
 * Normalize image URL for deduplication comparison
 * Removes common variations that point to the same image
 */
function normalizeImageUrl(url: string): string {
    try {
        const urlObj = new URL(url);

        // Get the pathname
        let pathname = urlObj.pathname;

        // Remove common size/dimension suffixes from filename
        // Patterns like: _150x150, -300x300, _thumb, _small, _medium, _large, @2x, etc.
        pathname = pathname.replace(/[-_]?\d+x\d+/gi, ''); // _150x150, -300x300
        pathname = pathname.replace(/[-_](thumb|thumbnail|small|medium|large|xs|sm|md|lg|xl)/gi, ''); // _thumb, _small
        pathname = pathname.replace(/@\d+x/gi, ''); // @2x, @3x
        pathname = pathname.replace(/[-_](preview|scaled|resized|compressed)/gi, ''); // _preview, _scaled
        pathname = pathname.replace(/[-_]w\d+/gi, ''); // _w300, -w500
        pathname = pathname.replace(/[-_]h\d+/gi, ''); // _h300, -h500

        // Normalize CDN paths that might have size folders
        pathname = pathname.replace(/\/\d+x\d+\//gi, '/');
        pathname = pathname.replace(/\/(thumb|thumbnail|small|medium|large)\//gi, '/');

        // Build normalized URL without query params
        const basePath = `${urlObj.origin}${pathname}`;

        return basePath.toLowerCase().replace(/\/$/, '');
    } catch {
        return url.toLowerCase().replace(/\/$/, '');
    }
}

/**
 * Deduplicate images from batch processing
 * Removes duplicate image URLs while preserving the first occurrence
 * @param images - Array of ImageData objects from multiple URLs
 * @returns Object containing unique images and count of duplicates removed
 */
export function deduplicateImages(images: ImageData[]): DeduplicationResult {
    const seen = new Set<string>();
    const uniqueImages: ImageData[] = [];
    let duplicatesRemoved = 0;

    for (const image of images) {
        const normalizedUrl = normalizeImageUrl(image.src);

        if (!seen.has(normalizedUrl)) {
            seen.add(normalizedUrl);
            uniqueImages.push(image);
        } else {
            duplicatesRemoved++;
        }
    }

    // Re-assign IDs to maintain sequential ordering
    return {
        uniqueImages: uniqueImages.map((img, index) => ({
            ...img,
            id: index + 1
        })),
        duplicatesRemoved
    };
}
