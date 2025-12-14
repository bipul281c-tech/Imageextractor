"use client"

import { Check, Minus, Package, Loader2 } from "lucide-react"

interface MobileActionBarProps {
  totalImages: number
  selectedCount: number
  isAllSelected: boolean
  isSomeSelected: boolean
  isDownloading: boolean
  downloadProgress: { current: number; total: number } | null
  onSelectAll: () => void
  onDownload: () => void
}

export function MobileActionBar({
  totalImages,
  selectedCount,
  isAllSelected,
  isSomeSelected,
  isDownloading,
  downloadProgress,
  onSelectAll,
  onDownload,
}: MobileActionBarProps) {
  // Don't render if no images
  if (totalImages === 0) return null

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      {/* Background with blur and shadow */}
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">

          {/* Left: Select All Toggle */}
          <button
            onClick={onSelectAll}
            className="flex items-center gap-3 active:scale-95 transition-transform"
            aria-label={isAllSelected ? "Deselect all" : "Select all"}
          >
            {/* Large touch target checkbox */}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                isAllSelected || isSomeSelected
                  ? "border-[#11224E] bg-[#11224E]"
                  : "border-gray-300 bg-white"
              }`}
            >
              {isAllSelected && <Check className="h-6 w-6 text-white" strokeWidth={3} />}
              {isSomeSelected && !isAllSelected && <Minus className="h-6 w-6 text-white" strokeWidth={3} />}
            </div>

            <div className="text-left">
              <div className="text-sm font-semibold text-[#11224E]">
                {isAllSelected ? "All Selected" : "Select All"}
              </div>
              <div className="text-xs text-slate-500">
                {selectedCount} of {totalImages}
              </div>
            </div>
          </button>

          {/* Right: Download Button */}
          <button
            onClick={onDownload}
            disabled={selectedCount === 0 || isDownloading}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all min-w-[140px] justify-center active:scale-95 ${
              selectedCount === 0 || isDownloading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#F87B1B] hover:bg-[#e06c15] shadow-lg"
            }`}
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>
                  {downloadProgress
                    ? `${downloadProgress.current}/${downloadProgress.total}`
                    : "..."}
                </span>
              </>
            ) : (
              <>
                <Package className="h-5 w-5" />
                <span>Download ({selectedCount})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
