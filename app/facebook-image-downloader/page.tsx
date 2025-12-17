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

export default function FacebookImageDownloaderPage() {
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
            title="Download All Photos from Facebook Pages & Profiles"
            subtitle="Download photos from Facebook pages, profiles, and posts. Extract Facebook albums and images in bulk. No login required, completely free."
            onScan={handleScan}
            isLoading={loading}
            status={status}
            defaultUrl="https://facebook.com"
            ctaText="Download Facebook Photos"
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
            <h2 className="text-2xl font-semibold text-[#11224E]">How to Download Facebook Photos</h2>
            <p className="text-slate-600">
              Our Facebook image downloader makes it easy to download photos from any public Facebook page, profile, or post.
              Simply paste the Facebook URL and our tool will extract all visible images. Perfect for saving event photos,
              downloading from business pages, or backing up your own Facebook albums. Works with public Facebook content -
              no login required. Download images individually or in bulk as a ZIP file.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#11224E] text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Can I download photos from private Facebook profiles?</h3>
                <p className="text-slate-600 text-sm">
                  Our tool works with publicly accessible Facebook content. Private profiles, private posts, and content behind login walls cannot be accessed.
                  You can download photos from public Facebook pages, public profiles, and posts that are visible without logging in.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">How do I download all photos from a Facebook album?</h3>
                <p className="text-slate-600 text-sm">
                  Paste the Facebook album URL into our tool and click "Download Facebook Photos". Our tool will scan the page and extract all visible images.
                  You can then select all images and download them as a ZIP file for easy bulk downloading.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Is it legal to download Facebook images?</h3>
                <p className="text-slate-600 text-sm">
                  You should only download images from Facebook that you have permission to use. Respect copyright and privacy laws.
                  This tool is intended for downloading your own photos, public domain content, or images you have rights to use.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Do I need to log into Facebook?</h3>
                <p className="text-slate-600 text-sm">
                  No login required! Our tool works with public Facebook content that's accessible without logging in. However, this means you can only access
                  publicly visible photos and pages.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Can I download my own Facebook photos in bulk?</h3>
                <p className="text-slate-600 text-sm">
                  Yes! If your Facebook profile or albums are set to public, you can use our tool to bulk download your own photos. Alternatively,
                  Facebook offers a native "Download Your Information" feature for downloading all your personal data.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#11224E] mb-2">Why can't I see all photos from a Facebook page?</h3>
                <p className="text-slate-600 text-sm">
                  Our tool extracts images that are visible on the current page. Some Facebook pages load more photos as you scroll.
                  Try scrolling to load all photos first, or access specific albums directly for better results.
                </p>
              </div>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="facebook-image-downloader" />
      </main>
      <Footer />
    </div>
  )
}
