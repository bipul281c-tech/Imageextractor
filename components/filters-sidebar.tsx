"use client"

import { useState, useEffect, useMemo } from "react"
import { Check, Download } from "lucide-react"
import { ImageData } from "@/lib/types/scraper"
import { calculateFilterStats } from "@/lib/filter-utils"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface FilterCheckboxProps {
  label: string
  count: number
  checked: boolean
  onChange: (checked: boolean) => void
}

function FilterCheckbox({ label, count, checked, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <div
        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${checked ? "border-[#11224E] bg-[#11224E]" : "border-gray-300 bg-white"
          }`}
      >
        {checked && <Check className="h-2.5 w-2.5 text-white" />}
      </div>
      <span className="text-xs text-slate-600">{label}</span>
      <span className="ml-auto text-[10px] text-slate-400">{count}</span>
    </label>
  )
}

interface FiltersSidebarProps {
  images: ImageData[];
  onFiltersChange: (filters: {
    selectedFormats: Set<string>;
    minWidth: number;
  }) => void;
}

export function FiltersSidebar({ images, onFiltersChange }: FiltersSidebarProps) {
  const [minWidth, setMinWidth] = useState(0)
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(new Set())

  // Calculate stats from images
  const stats = useMemo(() => calculateFilterStats(images), [images])

  // Get sorted formats for display
  const formatEntries = useMemo(() => {
    const entries = Object.entries(stats.formats)
    return entries.sort((a, b) => b[1] - a[1]) // Sort by count descending
  }, [stats.formats])

  // Notify parent of filter changes
  useEffect(() => {
    onFiltersChange({ selectedFormats, minWidth })
  }, [selectedFormats, minWidth, onFiltersChange])

  const handleFormatToggle = (format: string, checked: boolean) => {
    const newFormats = new Set(selectedFormats)
    if (checked) {
      newFormats.add(format)
    } else {
      newFormats.delete(format)
    }
    setSelectedFormats(newFormats)
  }

  const handleReset = () => {
    setSelectedFormats(new Set())
    setMinWidth(0)
  }

  const hasImages = images.length > 0

  return (
    <aside className="lg:col-span-3">
      <div className="sticky top-20 space-y-6 rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#11224E]">Filters</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleReset}
                className="text-[10px] font-medium text-slate-400 hover:text-slate-600"
              >
                Reset
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={4}>
              Reset all filters
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Filter: Format */}
        <div className="space-y-3">
          <label className="text-xs font-medium text-slate-700">File Format</label>
          <div className="space-y-2">
            {hasImages ? (
              formatEntries.length > 0 ? (
                formatEntries.map(([format, count]) => (
                  <FilterCheckbox
                    key={format}
                    label={format}
                    count={count}
                    checked={selectedFormats.has(format)}
                    onChange={(checked) => handleFormatToggle(format, checked)}
                  />
                ))
              ) : (
                <p className="text-xs text-slate-400">No formats detected</p>
              )
            ) : (
              <p className="text-xs text-slate-400 italic">Scan a URL to see formats</p>
            )}
          </div>
        </div>

        {/* Filter: Size */}
        <div className="space-y-3 border-t border-gray-50 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-700">Min Width</label>
            <span className="text-[10px] text-slate-400">{minWidth}px</span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={minWidth}
                onChange={(e) => setMinWidth(Number(e.target.value))}
                className="range-slider w-full"
                disabled={!hasImages}
              />
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={4}>
              {minWidth === 0 ? "No minimum width filter" : `Filter images wider than ${minWidth}px`}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Stats summary */}
        {hasImages && (
          <div className="border-t border-gray-50 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Total images</span>
              <span className="font-medium text-[#11224E]">{stats.totalCount}</span>
            </div>
          </div>
        )}

        <div className="mt-4 border-t border-gray-100 pt-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex w-full items-center justify-center gap-2 rounded border border-gray-200 bg-white py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-gray-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasImages}
              >
                <Download className="h-3.5 w-3.5" />
                Export Filter Config
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={4}>
              Export current filter settings
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </aside>
  )
}
