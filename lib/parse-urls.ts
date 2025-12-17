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
 * Performs basic security validation without modifying the URL
 */
export function validateUrls(urls: string[]): {
  valid: string[];
  invalid: string[]
} {
  const valid: string[] = [];
  const invalid: string[] = [];

  urls.forEach(url => {
    try {
      // Block file:// URLs for security
      if (url.match(/^file:\/\//i)) {
        invalid.push(url);
        return;
      }

      // Validate using URL constructor (allow URLs without protocol)
      let parsed: URL;
      try {
        // Try parsing as-is first
        parsed = new URL(url);
      } catch {
        // If parsing fails, try adding https:// for validation only
        try {
          parsed = new URL(`https://${url}`);
        } catch {
          invalid.push(url);
          return;
        }
      }

      // Basic hostname validation
      if (!parsed.hostname || parsed.hostname.length < 1) {
        invalid.push(url);
        return;
      }

      // Block localhost and internal IPs for security
      const hostname = parsed.hostname.toLowerCase();
      if (hostname === 'localhost' || hostname === '127.0.0.1' ||
          hostname.startsWith('192.168.') || hostname.startsWith('10.') ||
          hostname.startsWith('172.')) {
        invalid.push(url);
        return;
      }

      // Additional validation: must have hostname with domain
      if (parsed.hostname && parsed.hostname.includes('.')) {
        valid.push(url); // Use original URL, not modified
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
