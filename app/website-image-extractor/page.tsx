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

export default function WebsiteImageExtractorPage() {
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
  const [deepScrape, setDeepScrape] = useState(true)

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
            title="Extract All Images from Any Website Instantly"
            subtitle="Professional image extraction tool for designers and developers. Extract all images from portfolios, galleries, and any webpage with one click."
            onScan={handleScan}
            isLoading={loading}
            status={status}
            defaultUrl="https://portfolio-example.com"
            ctaText="Extract Website Images"
            isQueued={isQueued}
            queuePosition={queuePosition}
            batchProgress={batchProgress}
            batchMode={batchMode}
            onBatchModeChange={setBatchMode}
            deepScrape={deepScrape}
            onDeepScrapeChange={setDeepScrape}
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
            <h2 className="text-2xl font-semibold text-[#11224E]">Professional Website Image Extraction</h2>
            <p className="text-slate-600">
              Extract all images from any website with our professional-grade web image extractor. Perfect for designers
              backing up portfolio websites, developers scraping product images, or anyone needing to download all images from a webpage.
              Our tool finds visible images, background images, and hidden graphics. Filter by format, size, or dimensions before
              downloading. Export image URLs or download everything as a ZIP file. Ideal for competitive research, design inspiration,
              or creating backups of image galleries.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Which websites can I extract images from?</h3>
                <p className="text-slate-600 text-sm">
                  Our website image extractor works with most public websites including portfolios, e-commerce sites, galleries, blogs, and more.
                  We extract all visible images from the HTML of any webpage you paste.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Can I extract background images from CSS?</h3>
                <p className="text-slate-600 text-sm">
                  Yes! Our tool extracts images from various sources including CSS background images, inline styles, and image tags.
                  We scan the entire page to find all image references.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">How many images can I extract at once?</h3>
                <p className="text-slate-600 text-sm">
                  There's no limit to the number of images you can extract. Our tool will find all images on the webpage,
                  whether it's 10 or 1000+. Use our filters to narrow down results if needed.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Does it work on password-protected websites?</h3>
                <p className="text-slate-600 text-sm">
                  Our tool works with publicly accessible content. Websites behind authentication, paywalls, or login screens cannot be accessed.
                  You need to be able to view the page without logging in.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Is the original image quality preserved?</h3>
                <p className="text-slate-600 text-sm">
                  Yes! We extract and download images in their original quality as hosted on the website. No compression or quality loss occurs during the extraction process.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Can I extract images from portfolio websites like Behance?</h3>
                <p className="text-slate-600 text-sm">
                  Yes! Our tool works great with portfolio platforms like Behance, Dribbble, ArtStation, and personal portfolio websites.
                  Perfect for backing up your own work or gathering design inspiration (with proper attribution).
                </p>
              </div>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="website-image-extractor" />
      </main>
      <Footer />
    </div>
  )
}
