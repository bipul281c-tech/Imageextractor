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
import { Link2, Copy, Code, Share2 } from "lucide-react"

export default function ImageLinkPage() {
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
        setStatus("Extracting links...")
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
                    setError(data.error || "Failed to extract image links")
                    setStatus("Error")
                    return
                }

                setImages(data.images)
                setStatus(`Found ${data.images.length} image links`)
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
                        title="Image Link Extractor"
                        subtitle="Get image URLs from any webpage instantly. Extract, copy, and use image links for embedding, sharing, or development projects."
                        onScan={handleScan}
                        isLoading={loading}
                        status={status}
                        ctaText="Extract Links"
                        isQueued={isQueued}
                        queuePosition={queuePosition}
                    />
                </section>

                <section aria-label="Image link extraction results">
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

                {/* Use Cases Section */}
                <section className="mt-16 border-t border-gray-200 pt-12">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">
                            What Can You Do with Image Links?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Code className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Web Development</h3>
                                <p className="text-xs text-slate-500">Get direct image URLs for use in your HTML, CSS, or JavaScript projects. Perfect for developers.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Share2 className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Easy Sharing</h3>
                                <p className="text-xs text-slate-500">Copy image URLs to share on forums, chat apps, or social media platforms.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Link2 className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Content Embedding</h3>
                                <p className="text-xs text-slate-500">Embed images in blogs, wikis, or documentation using direct image links.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg border border-gray-200">
                                <Copy className="h-6 w-6 text-[#F87B1B] mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-2">Quick Copy</h3>
                                <p className="text-xs text-slate-500">One-click copy for any image URL. No more right-clicking and digging through menus.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="mt-12 mb-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xl font-semibold text-[#11224E] text-center mb-6">How to Get Image Links</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                                <div className="w-8 h-8 rounded-full bg-[#11224E] text-white flex items-center justify-center text-sm font-semibold mx-auto mb-2">1</div>
                                <p className="text-xs text-slate-600">Paste any webpage URL</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                                <div className="w-8 h-8 rounded-full bg-[#11224E] text-white flex items-center justify-center text-sm font-semibold mx-auto mb-2">2</div>
                                <p className="text-xs text-slate-600">Extract all image links</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                                <div className="w-8 h-8 rounded-full bg-[#11224E] text-white flex items-center justify-center text-sm font-semibold mx-auto mb-2">3</div>
                                <p className="text-xs text-slate-600">Copy or download images</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Tools */}
                <RelatedTools currentSlug="image-link" />
            </main>
            <Footer />

        </div>
    )
}
