"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { LandingHero } from "@/components/landing-hero"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { ImageGrid } from "@/components/image-grid"
import { Footer } from "@/components/footer"
import { RelatedTools } from "@/components/related-tools"

import { useRequestQueue } from "@/hooks/use-request-queue"
import { ImageData, ScrapeResponse, BatchUrlState } from "@/lib/types/scraper"
import { filterImages } from "@/lib/filter-utils"
import { deduplicateImages } from "@/lib/deduplicate-images"

export default function BulkExtractorPage() {
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

    // Initialize progress tracking
    const initialProgress: BatchUrlState[] = urls.map(url => ({
      url,
      status: 'pending',
      imageCount: 0
    }))
    setBatchProgress(initialProgress)

    const allImages: ImageData[] = []
    let nextImageId = 1

    // Send all requests in parallel (no queue)
    const promises = urls.map(async (url, index) => {
      try {
        // Update to processing
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

        // Add sourceUrl to each image and renumber IDs
        const imagesWithSource = data.images.map(img => ({
          ...img,
          id: nextImageId++,
          sourceUrl: url
        }))

        allImages.push(...imagesWithSource)

        // Update to completed
        setBatchProgress(prev => prev.map((item, i) =>
          i === index ? {
            ...item,
            status: 'completed',
            imageCount: data.images.length
          } : item
        ))
      } catch (err) {
        // Update to failed
        setBatchProgress(prev => prev.map((item, i) =>
          i === index ? {
            ...item,
            status: 'failed',
            error: err instanceof Error ? err.message : 'Unknown error'
          } : item
        ))
      }
    })

    // Wait for all to complete
    await Promise.all(promises)

    // Deduplicate images from batch processing
    const { uniqueImages, duplicatesRemoved } = deduplicateImages(allImages)

    // Set aggregated results
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
            title="Bulk Image Extractor - Extract All Images at Once"
            subtitle="Professional bulk image extraction for portfolios, galleries, and websites. Extract hundreds of images simultaneously with advanced filtering options."
            onScan={handleScan}
            isLoading={loading}
            status={status}
            defaultUrl="https://portfolio-example.com"
            ctaText="Extract All"
            isQueued={isQueued}
            queuePosition={queuePosition}
            batchProgress={batchProgress}
            batchMode={batchMode}
            onBatchModeChange={setBatchMode}
          />
        </section>

        {images.length > 0 && (
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
        )}

        <section className="mt-16">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-semibold text-[#11224E]">Professional Bulk Image Extraction</h2>
            <p className="text-slate-600">
              Extract all images from any website in bulk with our professional-grade tool. Perfect for designers backing up portfolios,
              developers scraping image galleries, or anyone who needs to download multiple images at once. Our bulk extractor finds all
              images on a page and lets you filter by format, size, and dimensions before downloading everything as a convenient ZIP file.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">How many images can I extract at once?</h3>
                <p className="text-slate-600 text-sm">
                  Our bulk extractor can handle hundreds of images from a single webpage. There's no limit to the number of images you can extract and download.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Does it work on all websites?</h3>
                <p className="text-slate-600 text-sm">
                  Yes, our bulk extractor works on most public websites including portfolios, galleries, e-commerce sites, and more. We extract all visible images from the page.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Can I filter images before downloading?</h3>
                <p className="text-slate-600 text-sm">
                  Absolutely! Use our advanced filters to sort by format (JPG, PNG, WebP, GIF), minimum width, or other criteria before bulk downloading.
                </p>
              </div>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="bulk-extractor" />
      </main>
      <Footer />
    </div>
  )
}
