"use client"

import { useState } from "react"
import { Link, ArrowRight, Settings2, Loader2 } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { ScanProgress } from "@/components/scan-progress"
import { ScrapingStatus } from "@/components/scraping-status"

interface SearchSectionProps {
  onScan: (url: string) => Promise<void>;
  isLoading?: boolean;
  status?: string;
}

export function SearchSection({
  onScan,
  isLoading = false,
  status = "Ready",
}: SearchSectionProps) {
  const [url, setUrl] = useState("https://unsplash.com/wallpapers")

  const handleScan = async () => {
    if (url.trim()) {
      await onScan(url.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleScan()
    }
  }

  return (
    <div className="mb-10 flex flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight text-[#11224E] sm:text-4xl">Extract Images from Any Website in Bulk Free</h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-500">
          Free online image extractor tool. Enter a URL to preview, filter by size/format, and batch download all images instantly.
        </p>
      </div>

      <div className="relative w-full max-w-xl">
        <div className="relative flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-1 transition-all focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-100">
          <div className="flex h-full items-center pl-3 text-slate-400">
            <Link className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <input
            type="text"
            placeholder="https://example.com"
            className="h-10 w-full border-none bg-transparent px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleScan}
                disabled={isLoading || !url.trim()}
                className="flex h-9 items-center gap-2 rounded-md bg-[#F87B1B] px-4 text-xs font-medium text-white transition-colors hover:bg-[#e06c15] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <span>Scan</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              {isLoading ? "Extracting images..." : "Extract images from URL"}
            </TooltipContent>
          </Tooltip>
          {isLoading && (
            <div className="absolute inset-x-0 bottom-0 h-[2px]">
              <ScanProgress className="h-full w-full rounded-none bg-transparent" />
            </div>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <span className={`text-[10px] font-medium uppercase tracking-wider ${status === "Ready" ? "text-slate-400" :
            status === "Scanning..." ? "text-blue-500" :
              status.startsWith("Error") ? "text-red-500" : "text-green-500"
            }`}>
            Status: {status}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-slate-900">
                <Settings2 className="h-3 w-3" />
                Advanced Settings
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              Configure extraction options
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Animated scraping status */}
        {isLoading && (
          <ScrapingStatus isLoading={isLoading} className="mt-4" />
        )}
      </div>
    </div>
  )
}
