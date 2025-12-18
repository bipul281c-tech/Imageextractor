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

  const handleScan = async (urls: string | string[]) => {
    // Handle both single URL and array of URLs
    const url = Array.isArray(urls) ? urls[0] : urls

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
            title="Extract Image Links & URLs from Any Website"
            subtitle="Get direct URLs for all images on a webpage. Perfect for developers and designers who need image links for embedding or sharing."
            onScan={handleScan}
            isLoading={loading}
            status={status}
            defaultUrl="https://example.com"
            ctaText="Extract Links"
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
            <h2 className="text-2xl font-semibold text-[#11224E]">How to Get Image URLs from Websites</h2>
            <p className="text-slate-600">
              Extract image links and URLs from any webpage with our free tool. Simply paste the website URL,
              and we'll scan the page to find all image URLs. Perfect for developers who need to copy image URLs
              for embedding in HTML, sharing, or development purposes. Get direct links to all images in seconds.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">How to get an image URL from a website?</h3>
                <p className="text-slate-600 text-sm">
                  Simply paste the webpage URL into the search box, click "Extract Links", and our tool will find all images and display their direct URLs.
                  You can then copy individual URLs or export all of them at once.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Can I copy all image URLs at once?</h3>
                <p className="text-slate-600 text-sm">
                  Yes! After extracting images, you can select multiple images and copy their URLs in bulk. This is perfect for developers who need to quickly grab all image links from a page.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">What image formats are supported?</h3>
                <p className="text-slate-600 text-sm">
                  Our tool supports all common image formats including JPG, PNG, GIF, WebP, and SVG. You can filter by format to find specific types of images.
                </p>
              </div>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="image-link" />
      </main>
      <Footer />
    </div>
  )
}
