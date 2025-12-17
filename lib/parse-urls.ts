/**
 * URL Parsing and Validation Utilities for Batch Processing
 */

/**
 * Parse URLs from textarea input (supports newlines, commas, spaces)
 * Deduplicates and limits to max URLs
 */
export function parseUrlsFromInput(input: string, maxUrls: number = 5): string[] {
  if (!input || input.trim().length === 0) {
    return [];
  }

  // Split by newlines, commas, or multiple spaces
  const urls = input
    .split(/[\n,]+/)
    .map(url => url.trim())
    .filter(url => url.length > 0);

  // Deduplicate while preserving order
  const unique = Array.from(new Set(urls));

  // Limit to max URLs
  return unique.slice(0, maxUrls);
}

/**
 * Validate URLs and separate into valid/invalid lists
 * Adds https:// prefix if missing
 */
export function validateUrls(urls: string[]): {
  valid: string[];
  invalid: string[]
} {
  const valid: string[] = [];
  const invalid: string[] = [];

  urls.forEach(url => {
    try {
      // Add https:// if missing protocol
      let fullUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        fullUrl = `https://${url}`;
      }

      // Validate using URL constructor
      const parsed = new URL(fullUrl);

      // Additional validation: must have hostname
      if (parsed.hostname && parsed.hostname.includes('.')) {
        valid.push(fullUrl);
      } else {
        invalid.push(url);
      }
    } catch {
      invalid.push(url);
    }
  });

  return { valid, invalid };
}

/**
 * Get count of unique valid URLs from input
 */
export function getUrlCount(input: string, maxUrls: number = 5): number {
  const parsed = parseUrlsFromInput(input, maxUrls);
  const { valid } = validateUrls(parsed);
  return valid.length;
}

/**
 * Extract hostname from URL for display
 */
export function getHostname(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
