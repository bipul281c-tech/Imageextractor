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

export default function PicLinkPage() {
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
                setStatus(`Found ${data.images.length} images`)
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
        setStatus(`Found ${uniqueImages.length} images from ${successCount} URL${successCount !== 1 ? 's' : ''}${duplicateText}`)
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
                        title="Pic Link - Direct Picture URL & Link Extractor"
                        subtitle="Get direct pic links and URLs for any image on a website. Simply paste the URL and extract every picture link instantly for sharing or development."
                        onScan={handleScan}
                        isLoading={loading}
                        status={status}
                        defaultUrl="https://example.com"
                        ctaText="Get Pic Links"
                        isQueued={isQueued}
                        queuePosition={queuePosition}
                        batchProgress={batchProgress}
                        batchMode={batchMode}
                        onBatchModeChange={setBatchMode}
                        deepScrape={deepScrape}
                        onDeepScrapeChange={setDeepScrape}
                    />
                </section>

                <section aria-label="Image extraction results">
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
                        <h2 className="text-2xl font-semibold text-[#11224E]">How to Get a Pic Link from Any Website</h2>
                        <p className="text-slate-600">
                            Need a direct link to a picture on a website? Our Pic Link extractor makes it incredibly easy.
                            Sometimes you need a direct URL for embedding, reference, or sharing, but it's hidden behind scripts or complex layouts.
                            Just paste the webpage URL, and we'll provide you with the direct pic link for every image found on that page.
                        </p>
                    </div>
                </section>

                <LandingFAQ
                    items={[
                        {
                            question: "What is a pic link?",
                            answer: "A pic link is a direct URL that points to an image file (like .jpg, .png, or .webp) rather than a webpage containing it. Having the direct link allows you to embed the image or view it independently."
                        },
                        {
                            question: "How do I extract a pic link using this tool?",
                            answer: "Enter the URL of the website you want to scan, click 'Get Pic Links', and our tool will generate a list of direct URLs for every picture on that page. You can then copy the links you need."
                        },
                        {
                            question: "Is there a limit to how many pic links I can extract?",
                            answer: "No, there are no limits! You can extract pic links from as many pages as you want. Our service is free and unlimited."
                        }
                    ]}
                />

                <RelatedTools currentSlug="pic-link" />
            </main>
            <Footer />
        </div>
    )
}
