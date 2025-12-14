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
import { Download, Zap, Shield, Globe } from "lucide-react"

export default function ImageDownloaderPage() {
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
        setStatus("Downloading...")
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
                    setError(data.error || "Failed to download images")
                    setStatus("Error")
                    return
                }

                setImages(data.images)
                setStatus(`Found ${data.images.length} images`)
            })
        } catch (err) {
            console.error("Download error:", err)
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
                        title="Free Image Downloader"
                        subtitle="Download images from any website in seconds. Paste a URL, preview all images, filter by format or size, and bulk download instantly. No signup required."
                        onScan={handleScan}
                        isLoading={loading}
                        status={status}
                        ctaText="Download Images"
                        isQueued={isQueued}
                        queuePosition={queuePosition}
                    />
                </section>

                <section aria-label="Image download results">
                    <div className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-12 lg:items-start">
                        <div className="lg:col-span-3 sticky top-14 z-40 bg-[#EEEEEE] py-2 lg:py-4">
                            <FiltersSidebar
                                images={images}
                                onFiltersChange={handleFiltersChange}
                            />
                        </div>
                        <div className="lg:col-span-9">
                            <ImageGrid
                                images={filteredImages}
                                loading={loading}
                                error={error}
                            />
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="mt-16 border-t border-gray-200 pt-12">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">
                            Why Use Our Image Downloader?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Download className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Bulk Download</h3>
                                <p className="text-xs text-slate-500">Download all images from any webpage as a ZIP file with one click. Perfect for saving entire galleries or portfolios.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Zap className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Instant Download</h3>
                                <p className="text-xs text-slate-500">No waiting, no queues. Paste your URL and start downloading images immediately.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Shield className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">No Registration</h3>
                                <p className="text-xs text-slate-500">Use our image downloader without signing up. We don't track or store your downloads.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Globe className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Works Everywhere</h3>
                                <p className="text-xs text-slate-500">Download images from blogs, social media, news sites, portfolios, and more.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popular Use Cases */}
                <section className="mt-12 mb-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-xl font-semibold text-[#11224E] mb-4">Popular Use Cases</h2>
                        <div className="flex flex-wrap justify-center gap-2">
                            {["Social Media Images", "Portfolio Downloads", "Reference Images", "Research Materials", "Blog Graphics", "Stock Photos"].map((useCase) => (
                                <span key={useCase} className="px-3 py-1 bg-white rounded-full text-xs text-slate-600 border border-gray-200">
                                    {useCase}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <RelatedTools currentSlug="image-downloader" />
            </main>
            <Footer />

        </div>
    )
}
