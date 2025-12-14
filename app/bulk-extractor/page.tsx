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
import { Layers, Filter, Archive, Search } from "lucide-react"

export default function BulkExtractorPage() {
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
        setStatus("Extracting...")
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
                    setError(data.error || "Failed to extract images")
                    setStatus("Error")
                    return
                }

                setImages(data.images)
                setStatus(`Extracted ${data.images.length} images`)
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
                <section aria-labelledby="hero-heading">
                    <LandingHero
                        title="Bulk Image Extractor"
                        subtitle="Extract all images from any website at once. Professional-grade tool with advanced filtering by format, size, and type. Perfect for designers, marketers, and researchers."
                        onScan={handleScan}
                        isLoading={loading}
                        status={status}
                        isLimitReached={usageLimit.isLimitReached}
                        ctaText="Extract All"
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

                <section aria-label="Bulk extraction results">
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

                {/* Professional Features */}
                <section className="mt-16 border-t border-gray-200 pt-12">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">
                            Professional Extraction Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Layers className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Bulk Extraction</h3>
                                <p className="text-xs text-slate-500">Extract hundreds of images from a single page. No limits on how many images you can find per scan.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Filter className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Advanced Filtering</h3>
                                <p className="text-xs text-slate-500">Filter by format (JPG, PNG, WebP, SVG, GIF) and minimum width to find exactly what you need.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Archive className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">ZIP Download</h3>
                                <p className="text-xs text-slate-500">Download all extracted images as a single ZIP file. One click to get everything.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Search className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Deep Extraction</h3>
                                <p className="text-xs text-slate-500">Finds hidden images, background images, and media that other tools miss.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who Uses This */}
                <section className="mt-12 mb-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-xl font-semibold text-[#11224E] mb-4">Built for Professionals</h2>
                        <div className="flex flex-wrap justify-center gap-2">
                            {["Graphic Designers", "Digital Marketers", "Content Creators", "Researchers", "Web Developers", "Social Media Managers"].map((role) => (
                                <span key={role} className="px-3 py-1 bg-white rounded-full text-xs text-slate-600 border border-gray-200">
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <RelatedTools currentSlug="bulk-extractor" />
            </main>
            <Footer />
            <QueueWaitingModal isVisible={isQueued} queuePosition={queuePosition} />
        </div>
    )
}
