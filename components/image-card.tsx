"use client"

import { memo } from "react"
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

export const ImageCard = memo(function ImageCard({ src, name, dimensions, size, checked, onToggle }: ImageCardProps) {
  return (
    <div
      className={`group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border-2 bg-gray-100 will-change-transform ${checked ? "border-[#F87B1B] shadow-md ring-1 ring-[#F87B1B]/20" : "border-gray-200 hover:border-gray-300"
        }`}
      onClick={onToggle}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={name}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03] ${checked ? "opacity-100" : "opacity-95 group-hover:opacity-100"
          }`}
      />
      <div className={`absolute inset-0 pointer-events-none ${checked ? "bg-[#F87B1B]/10" : ""}`} />

      {/* Top Overlay - Checkbox */}
      <div className="absolute left-2 top-2 z-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }}
              className={`flex items-center justify-center rounded-full border h-10 w-10 sm:h-6 sm:w-6 transition-colors duration-150 ${checked
                ? "border-[#F87B1B] bg-[#F87B1B] text-white shadow-md"
                : "border-white/60 bg-black/30 hover:border-white hover:bg-black/40 text-transparent"
                }`}
            >
              <Check className={`h-5 w-5 sm:h-3.5 sm:w-3.5 ${checked ? "opacity-100" : "opacity-0"}`} strokeWidth={3} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={4}>
            {checked ? "Deselect" : "Select for download"}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full border-t border-white/20 bg-white/95 p-3 backdrop-blur-sm transition-transform duration-200 ease-out group-hover:translate-y-0">
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
})

