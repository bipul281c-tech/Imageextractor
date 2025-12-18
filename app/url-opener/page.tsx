"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { LandingHero } from "@/components/landing-hero"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { ImageGrid } from "@/components/image-grid"
import { Footer } from "@/components/footer"
import { RelatedTools } from "@/components/related-tools"

import { useRequestQueue } from "@/hooks/use-request-queue"
import { ImageData, ScrapeResponse } from "@/lib/types/scraper"
import { filterImages } from "@/lib/filter-utils"

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

  const handleScan = async (urls: string | string[]) => {
    // Normalize to single URL (this page only handles one URL at a time)
    const url = Array.isArray(urls) ? urls[0] : urls

    if (!url) {
      setError("No URL provided")
      return
    }

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
            title="URL Image Viewer & Extractor - View Images from URLs"
            subtitle="Paste any URL to instantly view and download all images from that page. Quick and easy image viewing and extraction tool."
            onScan={handleScan}
            isLoading={loading}
            status={status}
            defaultUrl="https://example.com/page"
            ctaText="Open URL"
            isQueued={isQueued}
            queuePosition={queuePosition}
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
            <h2 className="text-2xl font-semibold text-[#11224E]">Open and View Images from Any URL</h2>
            <p className="text-slate-600">
              Our URL image viewer and extractor lets you quickly view and download all images from any webpage.
              Simply paste the URL and instantly see all images on that page. Perfect for browsing image galleries,
              checking photo URLs, or extracting images from specific pages. No need to visit the website directly -
              just paste the URL and start viewing images.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">What is a URL opener for images?</h3>
                <p className="text-slate-600 text-sm">
                  A URL opener for images is a tool that lets you view and extract all images from a webpage by simply pasting the page URL.
                  No need to visit the site - just open the URL in our tool and see all images instantly.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Can I view images before downloading?</h3>
                <p className="text-slate-600 text-sm">
                  Yes! Our URL opener displays all images in a grid view, so you can preview every image before deciding which ones to download.
                  Select specific images or download all of them at once.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">What types of URLs work with this tool?</h3>
                <p className="text-slate-600 text-sm">
                  Our tool works with any public webpage URL - blog posts, portfolios, galleries, product pages, and more. Just paste the URL and we'll extract all images from that page.
                </p>
              </div>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="url-opener" />
      </main>
      <Footer />
    </div>
  )
}
