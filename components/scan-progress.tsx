"use client"

import { cn } from "@/lib/utils"

interface ScanProgressProps {
  className?: string
}

export function ScanProgress({ className }: ScanProgressProps) {
  return (
    <div className={cn("relative h-1 w-full overflow-hidden rounded-full bg-slate-100", className)}>
      <div className="absolute inset-0 h-full w-full origin-left animate-scan bg-gradient-to-r from-transparent via-[#F87B1B] to-transparent" />
    </div>
  )
}
