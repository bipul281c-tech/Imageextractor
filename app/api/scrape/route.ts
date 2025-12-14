import { NextRequest, NextResponse } from 'next/server';
import { convertImageUrls } from '@/lib/parse-images';
import { ScrapeResponse, ImageScraperResponse } from '@/lib/types/scraper';

// Image Scraper API URL from environment
const IMAGE_SCRAPER_API_URL = process.env.IMAGE_SCRAPER_API_URL;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'URL is required' },
                { status: 400 }
            );
        }

        // --- URL Normalization (Shared) ---
        let normalizedUrl = url.trim();
        normalizedUrl = normalizedUrl.replace(/^["']+|["']+$/g, '');
        if (normalizedUrl.match(/^https?:\/\//i)) {
        } else if (normalizedUrl.match(/^\/\//)) {
            normalizedUrl = `https:${normalizedUrl}`;
        } else if (normalizedUrl.match(/^https?:/i) && !normalizedUrl.match(/^https?:\/\//i)) {
            normalizedUrl = normalizedUrl.replace(/^(https?:)/i, '$1//');
        } else if (normalizedUrl.match(/^ftp:\/\//i)) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'FTP URLs are not supported. Please use HTTP or HTTPS.' },
                { status: 400 }
            );
        } else if (normalizedUrl.match(/^file:\/\//i)) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'Local file URLs are not supported.' },
                { status: 400 }
            );
        } else {
            normalizedUrl = `https://${normalizedUrl}`;
        }

        let parsedUrl: URL;
        try {
            parsedUrl = new URL(normalizedUrl);
        } catch {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'Invalid URL format. Please enter a valid website URL.' },
                { status: 400 }
            );
        }

        if (!parsedUrl.hostname || parsedUrl.hostname.length < 1) {
            return NextResponse.json<ScrapeResponse>(
                { success: false, images: [], error: 'URL must include a valid domain name.' },
                { status: 400 }
            );
        }

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

        // Call Image Scraper API
        const scraperUrl = `${IMAGE_SCRAPER_API_URL}/images?url=${encodeURIComponent(normalizedUrl)}`;

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
                url: normalizedUrl,
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
