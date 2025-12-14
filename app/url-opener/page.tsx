"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { LandingHero } from "@/components/landing-hero"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { ImageGrid } from "@/components/image-grid"
import { Footer } from "@/components/footer"

import { useRequestQueue } from "@/hooks/use-request-queue"
import { ImageData, ScrapeResponse } from "@/lib/types/scraper"
import { filterImages } from "@/lib/filter-utils"
import { RelatedTools } from "@/components/related-tools"
import { ExternalLink, Eye, Clipboard, Image } from "lucide-react"

export default function UrlOpenerPage() {
    const [images, setImages] = useState<ImageData[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const [status, setStatus] = useState("Ready")
    const [filters, setFilters] = useState<{
        selectedFormats: Set<string>;
        minWidth: number;
    }>({ selectedFormats: new Set(), minWidth: 0 })

    const { isQueued, queuePosition, queueRequest } = useRequestQueue()

    const handleScan = async (url: string) => {
        setLoading(true)
        setError(undefined)
        setStatus("Opening URL...")
        setImages([])

        try {
            await queueRequest(async () => {
                const response = await fetch("/api/scrape", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url }),
                    credentials: 'include',
                })

                const data: ScrapeResponse = await response.json()

                if (!data.success) {
                    setError(data.error || "Failed to open URL")
                    setStatus("Error")
                    return
                }

                setImages(data.images)
                setStatus(`Found ${data.images.length} images`)
            })
        } catch (err) {
            console.error("URL open error:", err)
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
                        title="URL Image Viewer & Extractor"
                        subtitle="Paste any URL to instantly view and extract all images. Preview pictures, get image URLs, and download. The fastest way to open and explore images from any webpage."
                        onScan={handleScan}
                        isLoading={loading}
                        status={status}
                        ctaText="Open URL"
                        isQueued={isQueued}
                        queuePosition={queuePosition}
                    />
                </section>

                <section aria-label="URL image viewing results">
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

                {/* Features */}
                <section className="mt-16 border-t border-gray-200 pt-12">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">
                            Quick URL Image Tools
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Clipboard className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Paste & Go</h3>
                                <p className="text-xs text-slate-500">Simply paste any URL and instantly see all images on that page. No complicated setup required.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Eye className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Preview All</h3>
                                <p className="text-xs text-slate-500">View thumbnails of every image before downloading. See exactly what you're getting.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <ExternalLink className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Get Direct URLs</h3>
                                <p className="text-xs text-slate-500">Copy the direct URL of any image. Perfect for sharing or embedding in other projects.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Image className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">All Formats</h3>
                                <p className="text-xs text-slate-500">Works with JPG, PNG, WebP, GIF, SVG and more. Find any image type.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <RelatedTools currentSlug="url-opener" />
            </main>
            <Footer />

        </div>
    )
}
