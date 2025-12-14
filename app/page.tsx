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
import { ImageData, ScrapeResponse } from "@/lib/types/scraper"
import { filterImages } from "@/lib/filter-utils"

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [status, setStatus] = useState("Ready")
  const [filters, setFilters] = useState<{
    selectedFormats: Set<string>;
    minWidth: number;
  }>({ selectedFormats: new Set(), minWidth: 0 })

  // Request queue system - limits to 2 concurrent requests
  const { isQueued, queuePosition, queueRequest } = useRequestQueue()

  const handleScan = async (url: string) => {
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

  const handleFiltersChange = useCallback((newFilters: {
    selectedFormats: Set<string>;
    minWidth: number;
  }) => {
    setFilters(newFilters)
  }, [])

  // Apply filters to images
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
        {/* Hero Section with Tool */}
        <section aria-labelledby="hero-heading">
          <SearchSection
            onScan={handleScan}
            isLoading={loading}
            status={status}
            isQueued={isQueued}
            queuePosition={queuePosition}
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
