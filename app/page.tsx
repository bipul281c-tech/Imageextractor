"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { SearchSection } from "@/components/search-section"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { ImageGrid } from "@/components/image-grid"
import { Footer } from "@/components/footer"
import { SEOContent } from "@/components/seo-content"
import { FAQSection } from "@/components/faq-section"

import { useRequestQueue } from "@/hooks/use-request-queue"
import { ImageData, ScrapeResponse, BatchUrlState } from "@/lib/types/scraper"
import { filterImages } from "@/lib/filter-utils"
import { deduplicateImages } from "@/lib/deduplicate-images"

export default function Home() {
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

  // Request queue system - limits to 2 concurrent requests
  const { isQueued, queuePosition, queueRequest } = useRequestQueue()

  const handleSingleScan = async (url: string) => {
    setLoading(true)
    setError(undefined)
    setStatus("Scanning...")
    setImages([])

    try {
      // Use queue system to limit concurrent requests
      await queueRequest(async () => {
        const response = await fetch("/api/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
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
          body: JSON.stringify({ url }),
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

    // Deduplicate images from batch processing
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

  // Apply filters to images
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
        {/* Hero Section with Tool */}
        <section aria-labelledby="hero-heading">
          <SearchSection
            onScan={handleScan}
            isLoading={loading}
            status={status}
            isQueued={isQueued}
            queuePosition={queuePosition}
            batchProgress={batchProgress}
            batchMode={batchMode}
            onBatchModeChange={setBatchMode}
          />
        </section>

        {/* Results Section */}
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

        {/* SEO Content - Features & How It Works */}
        <SEOContent />

        {/* FAQ Section with Schema */}
        <FAQSection />
      </main>
      <Footer />

    </div>
  )
}
