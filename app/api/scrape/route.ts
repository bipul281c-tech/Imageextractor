import { NextRequest, NextResponse } from 'next/server';
import { convertImageUrls } from '@/lib/parse-images';
import { ScrapeResponse, ImageScraperResponse } from '@/lib/types/scraper';

// Image Scraper API URL from environment
const IMAGE_SCRAPER_API_URL = process.env.IMAGE_SCRAPER_API_URL;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { url, deepScrape = true } = body;

        if (!url) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'URL is required' },
                { status: 400 }
            );
        }

        // Basic validation with minimal modification
        const trimmedUrl = url.trim();

        // Block file:// URLs for security
        if (trimmedUrl.match(/^file:\/\//i)) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'Local file URLs are not supported.' },
                { status: 400 }
            );
        }

        // Validate URL format (allow URLs without protocol)
        let parsedUrl: URL;
        try {
            // Try parsing as-is first
            parsedUrl = new URL(trimmedUrl);
        } catch {
            // If parsing fails, try adding https:// for validation only
            try {
                parsedUrl = new URL(`https://${trimmedUrl}`);
            } catch {
                return NextResponse.json<ScrapeResponse>(
                    { success: false, images: [], error: 'Invalid URL format. Please enter a valid website URL.' },
                    { status: 400 }
                );
            }
        }

        // Basic hostname validation
        if (!parsedUrl.hostname || parsedUrl.hostname.length < 1) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'URL must include a valid domain name.' },
                { status: 400 }
            );
        }

        // Block localhost and internal IPs for security
        const hostname = parsedUrl.hostname.toLowerCase();
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.')) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'Local or internal URLs are not supported.' },
                { status: 400 }
            );
        }

        if (!hostname.includes('.')) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'Please enter a complete URL with domain (e.g., example.com).' },
                { status: 400 }
            );
        }

        // Check if Image Scraper API URL is configured
        if (!IMAGE_SCRAPER_API_URL) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'Image Scraper API URL not configured' },
                { status: 500 }
            );
        }

        // Call Image Scraper API with trimmed URL (passed exactly as user typed)
        const scraperUrl = `${IMAGE_SCRAPER_API_URL}/images?url=${encodeURIComponent(trimmedUrl)}&deep_scrape=${deepScrape}`;

        let scraperResponse: Response;
        try {
            scraperResponse = await fetch(scraperUrl, {
                signal: AbortSignal.timeout(120000), // 2 minute timeout
            });
        } catch (fetchError) {
            console.error('Image Scraper API fetch error:', fetchError);
            const errorMessage = fetchError instanceof Error ? fetchError.message : 'Connection failed';
            return NextResponse.json<ScrapeResponse>(
                {
                    success: false,
                    images: [],
                    error: `Image Scraper API connection error: ${errorMessage}`
                },
                { status: 503 }
            );
        }

        if (!scraperResponse.ok) {
            const errorText = await scraperResponse.text();
            console.error('Image Scraper API error:', errorText);
            return NextResponse.json<ScrapeResponse>(
                {
                    success: false,
                    images: [],
                    error: `Image Scraper API error: ${scraperResponse.status}`
                },
                { status: scraperResponse.status }
            );
        }

        const scraperData: ImageScraperResponse = await scraperResponse.json();

        if (scraperData.status === 'error') {
            return NextResponse.json<ScrapeResponse>(
                {
                    success: false,
                    images: [],
                    error: scraperData.error || 'Scraping failed'
                },
                { status: 500 }
            );
        }

        // Convert image URLs to ImageData format
        const images = convertImageUrls(scraperData.images || []);

        const response = NextResponse.json<ScrapeResponse>({
            success: true,
            images,
            metadata: {
                total_found: images.length,
                url: trimmedUrl,
            },
        });

        return response;
    } catch (error) {
        console.error('Scrape API error:', error);
        return NextResponse.json<ScrapeResponse>(
            {
                success: false,
                images: [],
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
