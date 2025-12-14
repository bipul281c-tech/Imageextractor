"use client"

import { useState } from "react"
import { Link, ArrowRight, Loader2 } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"


interface LandingHeroProps {
    title: string
    subtitle: string
    onScan: (url: string) => Promise<void>
    isLoading?: boolean
    status?: string
    isLimitReached?: boolean
    defaultUrl?: string
    ctaText?: string
    isQueued?: boolean
    queuePosition?: number
}

export function LandingHero({
    title,
    subtitle,
    onScan,
    isLoading = false,
    status = "Ready",
    isLimitReached = false,
    defaultUrl = "https://unsplash.com/wallpapers",
    ctaText = "Extract Images",
    isQueued = false,
    queuePosition = 0
}: LandingHeroProps) {
    const [url, setUrl] = useState(defaultUrl)

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
            <div className="space-y-3">
                <h1 className="text-3xl font-medium tracking-tight text-[#11224E] sm:text-4xl lg:text-5xl">
                    {title}
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-slate-500 sm:text-base">
                    {subtitle}
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
                        disabled={isLoading || isLimitReached}
                    />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={handleScan}
                                disabled={isLoading || !url.trim() || isLimitReached}
                                className="flex h-9 items-center gap-2 rounded-md bg-[#F87B1B] px-4 text-xs font-medium text-white transition-colors hover:bg-[#e06c15] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Scanning...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{ctaText}</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </>
                                )}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" sideOffset={4}>
                            {isLimitReached ? "Daily limit reached" : isLoading ? "Extracting images..." : "Extract images from URL"}
                        </TooltipContent>
                    </Tooltip>

                </div>
                <div className="mt-2 flex items-center justify-center">
                    <span className={`text-[10px] font-medium uppercase tracking-wider ${status === "Ready" ? "text-slate-400" :
                        status === "Scanning..." ? "text-blue-500" :
                            status.startsWith("Error") ? "text-red-500" : "text-green-500"
                        }`}>
                        Status: {status}
                    </span>
                </div>



                {/* Inline Queue Status - Text Only */}
                {isQueued && (
                    <div className="mt-4 text-sm text-slate-500 animate-pulse">
                        Waiting in queue... Position: <span className="font-semibold text-[#F87B1B]">#{queuePosition}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
