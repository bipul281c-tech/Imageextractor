import { ImageData } from './types/scraper';

export interface FilterStats {
    formats: Record<string, number>;
    totalCount: number;
}

/**
 * Calculate filter statistics from images
 */
export function calculateFilterStats(images: ImageData[]): FilterStats {
    const formats: Record<string, number> = {};

    images.forEach(image => {
        const ext = getFileExtension(image.name).toUpperCase();
        formats[ext] = (formats[ext] || 0) + 1;
    });

    return {
        formats,
        totalCount: images.length,
    };
}

/**
 * Get file extension from filename
 */
function getFileExtension(filename: string): string {
    const match = filename.match(/\.([a-zA-Z0-9]+)(?:\?.*)?$/);
    return match ? match[1].toLowerCase() : 'unknown';
}

/**
 * Filter images based on selected filters
 */
export function filterImages(
    images: ImageData[],
    selectedFormats: Set<string>,
    minWidth: number
): ImageData[] {
    return images.filter(image => {
        // Format filter
        const ext = getFileExtension(image.name).toUpperCase();
        if (selectedFormats.size > 0 && !selectedFormats.has(ext)) {
            return false;
        }

        // Width filter (if dimensions are known)
        if (minWidth > 0 && image.dimensions !== 'Unknown') {
            const widthMatch = image.dimensions.match(/^(\d+)/);
            if (widthMatch) {
                const width = parseInt(widthMatch[1], 10);
                if (width < minWidth) {
                    return false;
                }
            }
        }

        return true;
    });
}
