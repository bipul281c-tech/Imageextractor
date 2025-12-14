"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { LandingHero } from "@/components/landing-hero"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { ImageGrid } from "@/components/image-grid"
import { Footer } from "@/components/footer"
import { UsageBanner } from "@/components/usage-banner"
import { QueueWaitingModal } from "@/components/queue-waiting-modal"
import { useUsageLimit } from "@/hooks/use-usage-limit"
import { useRequestQueue } from "@/hooks/use-request-queue"
import { ImageData, ScrapeResponse } from "@/lib/types/scraper"
import { filterImages } from "@/lib/filter-utils"
import { RelatedTools } from "@/components/related-tools"
import { Image, Film, Download, Info } from "lucide-react"

export default function VideoDownloaderPage() {
    const [images, setImages] = useState<ImageData[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const [status, setStatus] = useState("Ready")
    const [filters, setFilters] = useState<{
        selectedFormats: Set<string>;
        minWidth: number;
    }>({ selectedFormats: new Set(), minWidth: 0 })

    const usageLimit = useUsageLimit()
    const { isQueued, queuePosition, queueRequest } = useRequestQueue()

    const handleScan = async (url: string) => {
        if (usageLimit.isLimitReached) {
            setError("Daily limit reached. Please try again tomorrow.")
            setStatus("Limit Reached")
            return
        }

        setLoading(true)
        setError(undefined)
        setStatus("Extracting media...")
        setImages([])

        try {
            await queueRequest(async () => {
                const response = await fetch("/api/scrape", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url }),
                    credentials: 'include',
                })

                usageLimit.updateFromResponse(response)
                const data: ScrapeResponse = await response.json()

                if (!data.success) {
                    setError(data.error || "Failed to extract media")
                    setStatus("Error")
                    return
                }

                setImages(data.images)
                setStatus(`Found ${data.images.length} images`)
            })
        } catch (err) {
            console.error("Extraction error:", err)
            setError(err instanceof Error ? err.message : "Failed to connect to server")
            setStatus("Error")
        } finally {
            setLoading(false)
        }
    }

    const handleFiltersChange = useCallback((newFilters: {
        selectedFormats: Set<string>;
        minWidth: number;
    }) => {
        setFilters(newFilters)
    }, [])

    const filteredImages = useMemo(() => {
        if (filters.selectedFormats.size === 0 && filters.minWidth === 0) {
            return images
        }
        return filterImages(images, filters.selectedFormats, filters.minWidth)
    }, [images, filters])

    return (
        <div className="min-h-screen bg-[#EEEEEE] text-[#11224E] antialiased selection:bg-[#CBD99B]">
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" role="main">
                {/* Info Banner */}
                <div className="max-w-xl mx-auto mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-blue-800 font-medium">Looking for video downloads?</p>
                        <p className="text-xs text-blue-600 mt-1">ExtractPics specializes in <strong>image extraction</strong>. We can extract thumbnails, preview images, and all images from video pages. For direct video downloads, try dedicated video tools.</p>
                    </div>
                </div>

                <section aria-labelledby="hero-heading">
                    <LandingHero
                        title="Video Thumbnail & Image Extractor"
                        subtitle="Extract thumbnails, preview frames, and all images from video pages. Get images from YouTube, Vimeo, and any video hosting site."
                        onScan={handleScan}
                        isLoading={loading}
                        status={status}
                        isLimitReached={usageLimit.isLimitReached}
                        defaultUrl="https://www.youtube.com"
                        ctaText="Extract Images"
                    />
                </section>

                <div className="mb-6" role="status" aria-live="polite">
                    <UsageBanner
                        remaining={usageLimit.remaining}
                        limit={usageLimit.limit}
                        isLimitReached={usageLimit.isLimitReached}
                        isWarning={usageLimit.isWarning}
                        resetAt={usageLimit.resetAt}
                        isLoggedIn={usageLimit.isLoggedIn}
                        isLoading={usageLimit.isLoading}
                    />
                </div>

                <section aria-label="Media extraction results">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <FiltersSidebar
                            images={images}
                            onFiltersChange={handleFiltersChange}
                        />
                        <ImageGrid
                            images={filteredImages}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </section>

                {/* What You Can Extract */}
                <section className="mt-16 border-t border-gray-200 pt-12">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">
                            What Can You Extract from Video Pages?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Film className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Video Thumbnails</h3>
                                <p className="text-xs text-slate-500">Download the main thumbnail and preview images from any video page.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Image className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Channel Artwork</h3>
                                <p className="text-xs text-slate-500">Extract channel logos, banners, and profile images from video platforms.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Download className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Preview Frames</h3>
                                <p className="text-xs text-slate-500">Get preview frames and storyboard images used by video players.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Image className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Related Images</h3>
                                <p className="text-xs text-slate-500">All images on the page - related videos, ads, UI elements, and more.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Supported Sites */}
                <section className="mt-12 mb-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-xl font-semibold text-[#11224E] mb-4">Works with All Video Sites</h2>
                        <div className="flex flex-wrap justify-center gap-2">
                            {["YouTube", "Vimeo", "Dailymotion", "Twitch", "TikTok Pages", "Facebook Videos", "Instagram Reels"].map((site) => (
                                <span key={site} className="px-3 py-1 bg-white rounded-full text-xs text-slate-600 border border-gray-200">
                                    {site}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <RelatedTools currentSlug="video-downloader" />
            </main>
            <Footer />
            <QueueWaitingModal isVisible={isQueued} queuePosition={queuePosition} />
        </div>
    )
}
