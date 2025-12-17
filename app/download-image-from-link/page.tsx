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

export default function DownloadImageFromLinkPage() {
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
            title="Download Images from Direct Links & URLs"
            subtitle="Download images from direct links and URLs. Paste image URLs and download in bulk. Perfect for batch downloading from spreadsheets or link lists."
            onScan={handleScan}
            isLoading={loading}
            status={status}
            defaultUrl="https://example.com/image.jpg"
            ctaText="Download from Link"
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
            <h2 className="text-2xl font-semibold text-[#11224E]">Download Images Using Direct Links</h2>
            <p className="text-slate-600">
              Download images from direct image URLs with our batch link downloader. Perfect for downloading images from spreadsheets,
              CSV files, or lists of image URLs. Simply paste the URL to the page containing image links, and our tool will extract
              and display all images for downloading. Ideal for batch operations, processing URL lists, or downloading images from
              catalogs. Preview images before downloading and filter by format or size. Download single images or bulk download
              everything as a ZIP file. Fast, free, and works with all image formats.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Can I paste multiple image URLs at once?</h3>
                <p className="text-slate-600 text-sm">
                  Currently, paste the URL of a webpage that contains multiple image links, and our tool will extract all of them.
                  For direct image URLs, paste the page URL and we'll find all images on that page.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">What's the difference between downloading from a link vs webpage?</h3>
                <p className="text-slate-600 text-sm">
                  This tool works with both direct image links (e.g., https://example.com/image.jpg) and webpages containing multiple images.
                  Paste any URL and we'll extract all images we find.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Which image formats are supported?</h3>
                <p className="text-slate-600 text-sm">
                  All common image formats are supported including JPG, PNG, GIF, WebP, SVG, BMP, and more.
                  Our tool automatically detects the format and provides appropriate filtering options.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">How fast can I download bulk images from links?</h3>
                <p className="text-slate-600 text-sm">
                  Our tool processes pages quickly, typically within seconds. After extraction, you can download all images at once as a ZIP file,
                  which is much faster than downloading images one by one.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Can I download from Google Drive or Dropbox links?</h3>
                <p className="text-slate-600 text-sm">
                  Our tool works with publicly accessible URLs. Private files on Google Drive or Dropbox require authentication and won't be accessible.
                  Public share links may work if the images are directly visible without logging in.
                </p>
              </div>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="download-image-from-link" />
      </main>
      <Footer />
    </div>
  )
}
