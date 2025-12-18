"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { LandingHero } from "@/components/landing-hero"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { ImageGrid } from "@/components/image-grid"
import { Footer } from "@/components/footer"
import { RelatedTools } from "@/components/related-tools"
import { LandingFAQ } from "@/components/landing-faq"

import { useRequestQueue } from "@/hooks/use-request-queue"
import { ImageData, ScrapeResponse, BatchUrlState } from "@/lib/types/scraper"
import { filterImages } from "@/lib/filter-utils"
import { deduplicateImages } from "@/lib/deduplicate-images"

export default function PhotosSaverPage() {
    const [images, setImages] = useState<ImageData[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const [status, setStatus] = useState("Ready")
    const [filters, setFilters] = useState<{
        selectedFormats: Set<string>;
        minWidth: number;
        selectedSourceUrls: Set<string>;
    }>({ selectedFormats: new Set(), minWidth: 0, selectedSourceUrls: new Set() })
    const [batchMode, setBatchMode] = useState(false)
    const [batchProgress, setBatchProgress] = useState<BatchUrlState[]>([])
    const [deepScrape, setDeepScrape] = useState(false)

    const { isQueued, queuePosition, queueRequest } = useRequestQueue()

    const handleSingleScan = async (url: string) => {
        setLoading(true)
        setError(undefined)
        setStatus("Scanning...")
        setImages([])

        try {
            await queueRequest(async () => {
                const response = await fetch("/api/scrape", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url, deepScrape }),
                    credentials: 'include',
                })

                const data: ScrapeResponse = await response.json()

                if (!data.success) {
                    setError(data.error || "Failed to scrape the page")
                    setStatus("Error")
                    return
                }

                setImages(data.images)
                setStatus(`Found ${data.images.length} photos`)
            })
        } catch (err) {
            console.error("Scrape error:", err)
            setError(err instanceof Error ? err.message : "Failed to connect to server")
            setStatus("Error")
        } finally {
            setLoading(false)
        }
    }

    const handleBatchScan = async (urls: string[]) => {
        setLoading(true)
        setError(undefined)
        setImages([])
        setStatus(`Processing ${urls.length} URLs...`)

        const initialProgress: BatchUrlState[] = urls.map(url => ({
            url,
            status: 'pending',
            imageCount: 0
        }))
        setBatchProgress(initialProgress)

        const allImages: ImageData[] = []
        let nextImageId = 1

        const promises = urls.map(async (url, index) => {
            try {
                setBatchProgress(prev => prev.map((item, i) =>
                    i === index ? { ...item, status: 'processing' } : item
                ))

                const response = await fetch("/api/scrape", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url, deepScrape }),
                    credentials: 'include',
                })

                const data: ScrapeResponse = await response.json()

                if (!data.success) {
                    throw new Error(data.error || 'Scrape failed')
                }

                const imagesWithSource = data.images.map(img => ({
                    ...img,
                    id: nextImageId++,
                    sourceUrl: url
                }))

                allImages.push(...imagesWithSource)

                setBatchProgress(prev => prev.map((item, i) =>
                    i === index ? {
                        ...item,
                        status: 'completed',
                        imageCount: data.images.length
                    } : item
                ))
            } catch (err) {
                setBatchProgress(prev => prev.map((item, i) =>
                    i === index ? {
                        ...item,
                        status: 'failed',
                        error: err instanceof Error ? err.message : 'Unknown error'
                    } : item
                ))
            }
        })

        await Promise.all(promises)

        const { uniqueImages, duplicatesRemoved } = deduplicateImages(allImages)

        setImages(uniqueImages)
        const successCount = batchProgress.filter(p => p.status === 'completed').length
        const duplicateText = duplicatesRemoved > 0 ? ` (${duplicatesRemoved} duplicate${duplicatesRemoved !== 1 ? 's' : ''} removed)` : ''
        setStatus(`Found ${uniqueImages.length} photos from ${successCount} URL${successCount !== 1 ? 's' : ''}${duplicateText}`)
        setLoading(false)
    }

    const handleScan = async (urlOrUrls: string | string[]) => {
        const urls = Array.isArray(urlOrUrls) ? urlOrUrls : [urlOrUrls]

        if (urls.length === 1) {
            return handleSingleScan(urls[0])
        }

        return handleBatchScan(urls)
    }

    const handleFiltersChange = useCallback((newFilters: {
        selectedFormats: Set<string>;
        minWidth: number;
        selectedSourceUrls: Set<string>;
    }) => {
        setFilters(newFilters)
    }, [])

    const filteredImages = useMemo(() => {
        if (filters.selectedFormats.size === 0 && filters.minWidth === 0 && filters.selectedSourceUrls.size === 0) {
            return images
        }
        return filterImages(images, filters.selectedFormats, filters.minWidth, filters.selectedSourceUrls)
    }, [images, filters])

    return (
        <div className="min-h-screen bg-[#EEEEEE] text-[#11224E] antialiased selection:bg-[#CBD99B]">
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" role="main">
                <section aria-labelledby="hero-heading">
                    <LandingHero
                        title="Photos Saver - Best Way to Save All Photos from Websites"
                        subtitle="Looking for an easy way to save photos? Our Photos Saver tool lets you extract, preview, and download all photos and images from any website URL instantly."
                        onScan={handleScan}
                        isLoading={loading}
                        status={status}
                        defaultUrl="https://example.com"
                        ctaText="Save Photos"
                        isQueued={isQueued}
                        queuePosition={queuePosition}
                        batchProgress={batchProgress}
                        batchMode={batchMode}
                        onBatchModeChange={setBatchMode}
                        deepScrape={deepScrape}
                        onDeepScrapeChange={setDeepScrape}
                    />
                </section>

                <section aria-label="Photo extraction results">
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

                <section className="mt-16">
                    <div className="max-w-4xl mx-auto text-center space-y-4">
                        <h2 className="text-2xl font-semibold text-[#11224E]">How to Save Photos from Any Website URL</h2>
                        <p className="text-slate-600">
                            Saving photos from a website shouldn't be a tedious one-by-one process. Our 'Photos Saver' tool automates the process by scanning the entire webpage for every image file and photo hosted there.
                            Whether they are high-resolution JPGs, small PNG icons, or modern WebP images, our tool finds them all.
                            Simply paste the website URL, click 'Save Photos', and browse all the visual content discovered. You can then download them individually or in bulk as a ZIP archive.
                        </p>
                    </div>
                </section>

                <LandingFAQ
                    items={[
                        {
                            question: "How do I use this photos saver?",
                            answer: "Just enter the URL of the webpage where the photos are located into the input field above. Our tool will scan the page and display all the photos it finds for you to preview and download."
                        },
                        {
                            question: "Is there a limit to how many photos I can save?",
                            answer: "No, our photos saver allows you to extract and download as many photos as the tool can find on the provided URL. There are no restrictions on the number of images per scan."
                        },
                        {
                            question: "What image formats does the photos saver support?",
                            answer: "The tool supports all common image formats used on the web, including JPEG, PNG, GIF, WebP, SVG, and even background images defined in CSS."
                        },
                        {
                            question: "Is this photo saving service free?",
                            answer: "Yes, 'Photos Saver' is a 100% free tool. You can use it to save photos from any website without paying a subscription or providing any personal information."
                        }
                    ]}
                />

                <RelatedTools currentSlug="photos-saver" />
            </main>
            <Footer />
        </div>
    )
}
