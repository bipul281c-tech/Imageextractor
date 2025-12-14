// Request payload for scraping
export interface ScrapeRequest {
  url: string;
}

// Individual image data
export interface ImageData {
  id: number;
  src: string;
  name: string;
  dimensions: string;
  size: string;
  defaultChecked: boolean;
}

// Response from our API route
export interface ScrapeResponse {
  success: boolean;
  images: ImageData[];
  error?: string;
  metadata?: {
    company_name?: string;
    company_description?: string;
    total_found: number;
    url: string;
  };
}

// Response from Image Scraper API
export interface ImageScraperResponse {
  status: 'success' | 'error';
  url: string;
  total: number;
  count: number;
  duplicates_removed: number;
  time_seconds: number;
  request_id: string;
  port_used: number;
  images: string[];
  error?: string;
  error_type?: string;
}

// Usage tracking status
export interface UsageStatus {
  used: number;
  remaining: number;
  limit: number;
  resetAt: string;
}
