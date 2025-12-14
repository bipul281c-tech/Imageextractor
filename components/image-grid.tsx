"use client"

import { useState, useEffect, useMemo } from "react"
import { Check, Minus, ChevronDown, Package, ArrowDown, ImageOff, Loader2 } from "lucide-react"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { ImageCard } from "./image-card"
import { ImageData } from "@/lib/types/scraper"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

type SortOption = 'size' | 'name' | 'dimensions'

interface ImageGridProps {
  images: ImageData[];
  loading?: boolean;
  error?: string;
}

// Parse size string to bytes for comparison
function parseSizeToBytes(sizeStr: string): number {
  const match = sizeStr.match(/^([\d.]+)\s*(B|KB|MB|GB)?$/i)
  if (!match) return 0
  const value = parseFloat(match[1])
  const unit = (match[2] || 'B').toUpperCase()
  const multipliers: Record<string, number> = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
  }
  return value * (multipliers[unit] || 1)
}

// Parse dimensions string to total pixels for comparison
function parseDimensionsToPixels(dimStr: string): number {
  const match = dimStr.match(/^(\d+)\s*[x×]\s*(\d+)$/i)
  if (!match) return 0
  return parseInt(match[1]) * parseInt(match[2])
}

export function ImageGrid({ images, loading = false, error }: ImageGridProps) {
  const [selectedImages, setSelectedImages] = useState<Set<number>>(
    new Set(images.filter((img) => img.defaultChecked).map((img) => img.id)),
  )
  const [sortBy, setSortBy] = useState<SortOption>('size')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Update selection when images change
  useEffect(() => {
    setSelectedImages(new Set(images.filter((img) => img.defaultChecked).map((img) => img.id)))
  }, [images])

  const handleSelectAll = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set())
    } else {
      setSelectedImages(new Set(images.map((img) => img.id)))
    }
  }

  const handleToggleImage = (id: number) => {
    const newSelected = new Set(selectedImages)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedImages(newSelected)
  }

  // Sorted images based on current sort option
  const sortedImages = useMemo(() => {
    return [...images].sort((a, b) => {
      switch (sortBy) {
        case 'size':
          return parseSizeToBytes(b.size) - parseSizeToBytes(a.size); // Descending
        case 'name':
          return a.name.localeCompare(b.name); // Ascending alphabetical
        case 'dimensions':
          return parseDimensionsToPixels(b.dimensions) - parseDimensionsToPixels(a.dimensions); // Descending
        default:
          return 0;
      }
    })
  }, [images, sortBy])

  // Handle sort option selection
  const handleSortChange = (option: SortOption) => {
    setSortBy(option)
    setShowSortMenu(false)
  }

  // Download selected images as ZIP
  const handleDownloadZip = async () => {
    if (selectedImages.size === 0) return

    setIsDownloading(true)
    try {
      const zip = new JSZip()
      const selectedImagesList = images.filter(img => selectedImages.has(img.id))

      // Fetch all images in parallel
      const imagePromises = selectedImagesList.map(async (img) => {
        try {
          const response = await fetch(img.src)
          if (!response.ok) throw new Error(`Failed to fetch ${img.name}`)
          const blob = await response.blob()
          return { name: img.name, blob }
        } catch (error) {
          console.error(`Error fetching image ${img.name}:`, error)
          return null
        }
      })

      const results = await Promise.all(imagePromises)

      // Add successfully fetched images to ZIP
      for (const result of results) {
        if (result) {
          zip.file(result.name, result.blob)
        }
      }

      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" })
      saveAs(zipBlob, `images-${Date.now()}.zip`)
    } catch (error) {
      console.error('Error creating ZIP:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const allSelected = images.length > 0 && selectedImages.size === images.length
  const someSelected = selectedImages.size > 0 && selectedImages.size < images.length

  // Error state
  if (error) {
    return (
      <div className="lg:col-span-9">
        <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-12 text-center">
          <ImageOff className="h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Scraping Failed</h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4 lg:col-span-9">
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
            <span className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-lg border border-gray-200 bg-gray-100 animate-pulse">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500" />
                <span className="mt-2 text-[10px] text-slate-400">Scanning...</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Empty state
  if (images.length === 0) {
    return (
      <div className="lg:col-span-9">
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-12 text-center">
          <ImageOff className="h-12 w-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-[#11224E] mb-2">No images found</h3>
          <p className="text-sm text-slate-500">Enter a URL and click Scan to extract images from a webpage.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:col-span-9">
      {/* Toolbar */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <label className="flex cursor-pointer items-center gap-2">
                <button
                  onClick={handleSelectAll}
                  className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${allSelected || someSelected ? "border-[#11224E] bg-[#11224E]" : "border-gray-300 bg-white"
                    }`}
                >
                  {allSelected && <Check className="h-2.5 w-2.5 text-white" />}
                  {someSelected && <Minus className="h-2.5 w-2.5 text-white" />}
                </button>
                <span className="text-xs font-medium text-slate-700">Select All</span>
              </label>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              {allSelected ? "Deselect all images" : "Select all images"}
            </TooltipContent>
          </Tooltip>
          <span className="h-4 w-px bg-gray-200" />
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs text-slate-500 cursor-default">
                <strong className="text-[#11224E]">{images.length}</strong> images found
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              Total images extracted from URL
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              <ChevronDown className={`h-3 w-3 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
            </button>
            {showSortMenu && (
              <div className="absolute right-0 top-full mt-1 z-10 w-32 rounded-md border border-gray-200 bg-white">
                <button
                  onClick={() => handleSortChange('size')}
                  className={`w-full px-3 py-2 text-left text-xs hover:bg-gray-100 ${sortBy === 'size' ? 'bg-gray-50 font-medium' : ''}`}
                >
                  Size
                </button>
                <button
                  onClick={() => handleSortChange('name')}
                  className={`w-full px-3 py-2 text-left text-xs hover:bg-gray-100 ${sortBy === 'name' ? 'bg-gray-50 font-medium' : ''}`}
                >
                  Name
                </button>
                <button
                  onClick={() => handleSortChange('dimensions')}
                  className={`w-full px-3 py-2 text-left text-xs hover:bg-gray-100 ${sortBy === 'dimensions' ? 'bg-gray-50 font-medium' : ''}`}
                >
                  Dimensions
                </button>
              </div>
            )}
          </div>

          {/* Download ZIP Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleDownloadZip}
                disabled={selectedImages.size === 0 || isDownloading}
                className="flex items-center gap-2 rounded bg-[#F87B1B] px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#e06c15] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Package className="h-3.5 w-3.5" />
                )}
                {isDownloading ? 'Downloading...' : `Download ZIP (${selectedImages.size})`}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              {selectedImages.size === 0 ? "Select images first" : `Download ${selectedImages.size} images as ZIP`}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {sortedImages.map((image) => (
          <ImageCard
            key={image.id}
            {...image}
            checked={selectedImages.has(image.id)}
            onToggle={() => handleToggleImage(image.id)}
          />
        ))}
      </div>

      {/* Load More */}
      {images.length >= 20 && (
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-gray-50 hover:text-slate-900">
            Load more assets
            <ArrowDown className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  )
}
