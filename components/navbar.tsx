"use client"

import { ChevronDown } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import Image from "next/image"

interface NavbarProps {
  onOpenAuth?: () => void;
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="ExtractPics Logo"
            width={28}
            height={28}
            className="rounded"
          />
          <span className="text-sm font-semibold tracking-tight text-[#11224E]">EXTRACTPICS</span>
        </Link>
        <div className="hidden gap-6 sm:flex items-center">
          {/* Tools Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900">
              Tools
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white rounded-lg border border-gray-200 shadow-lg py-2 min-w-[180px]">
                <Link href="/image-downloader" className="block px-4 py-2 text-xs text-slate-600 hover:bg-gray-50 hover:text-slate-900">
                  Image Downloader
                </Link>
                <Link href="/image-link" className="block px-4 py-2 text-xs text-slate-600 hover:bg-gray-50 hover:text-slate-900">
                  Image Link Extractor
                </Link>
                <Link href="/bulk-extractor" className="block px-4 py-2 text-xs text-slate-600 hover:bg-gray-50 hover:text-slate-900">
                  Bulk Extractor
                </Link>
                <Link href="/url-opener" className="block px-4 py-2 text-xs text-slate-600 hover:bg-gray-50 hover:text-slate-900">
                  URL Opener
                </Link>
                <Link href="/video-downloader" className="block px-4 py-2 text-xs text-slate-600 hover:bg-gray-50 hover:text-slate-900">
                  Video Thumbnails
                </Link>
              </div>
            </div>
          </div>
          <Link href="/about" className="text-xs font-medium text-slate-500 hover:text-slate-900">
            About
          </Link>
          <Link href="/help" className="text-xs font-medium text-slate-500 hover:text-slate-900">
            Help
          </Link>
          <Link href="/pricing" className="text-xs font-medium text-slate-500 hover:text-slate-900">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Auth buttons removed */}
        </div>
      </div>
    </nav>
  )
}
