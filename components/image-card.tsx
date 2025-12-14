"use client"

import { Check, Download } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface ImageCardProps {
  id: number
  src: string
  name: string
  dimensions: string
  size: string
  checked: boolean
  onToggle: () => void
}

export function ImageCard({ src, name, dimensions, size, checked, onToggle }: ImageCardProps) {
  return (
    <div className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
      <img
        src={src || "/placeholder.svg"}
        alt={name}
        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${!checked ? "opacity-80 group-hover:opacity-100" : ""
          }`}
      />
      <div className="absolute inset-0 bg-[#11224E]/0 transition-colors group-hover:bg-[#11224E]/10" />

      {/* Top Overlay - Checkbox */}
      <div className="absolute left-2 top-2 z-10 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }}
              className={`flex h-5 w-5 items-center justify-center rounded border backdrop-blur-sm transition-colors ${checked ? "border-white/40 bg-black/20" : "border-white/40 bg-black/20 hover:border-white"
                }`}
            >
              {checked && <Check className="h-3 w-3 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={4}>
            {checked ? "Deselect" : "Select for download"}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full border-t border-white/20 bg-white/95 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
        <div className="flex items-start justify-between">
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="w-24 truncate text-xs font-medium text-[#11224E] cursor-default">{name}</p>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={4}>
                {name}
              </TooltipContent>
            </Tooltip>
            <p className="text-[10px] text-slate-500">
              {dimensions} • {size}
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-slate-400 hover:text-slate-900">
                <Download className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={4}>
              Download image
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

