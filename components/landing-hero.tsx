"use client"

import { useState, useEffect } from "react"
import { Link, ArrowRight, Settings2, Loader2 } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

const SCAN_MESSAGES = [
    "Throttling server",
    "Opening browser",
    "Scrolling page",
    "Getting your butter",
]

const MESSAGE_ROTATE_INTERVAL = 3750 // Rotate message every 3.75 seconds (all 4 messages in 15 seconds)
const SCAN_DURATION = 17000 // 17 seconds

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
    const [progress, setProgress] = useState(0)
    const [messageIndex, setMessageIndex] = useState(0)

    // Progress bar animation when loading
    useEffect(() => {
        if (!isLoading) {
            setProgress(0)
            return
        }

        const startTime = Date.now()
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const newProgress = Math.min((elapsed / SCAN_DURATION) * 100, 95) // Cap at 95% until complete
            setProgress(newProgress)
        }, 50) // Smoother animation

        return () => clearInterval(interval)
    }, [isLoading])

    // Rotate messages frequently
    useEffect(() => {
        if (!isLoading) {
            setMessageIndex(0)
            return
        }

        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % SCAN_MESSAGES.length)
        }, MESSAGE_ROTATE_INTERVAL)

        return () => clearInterval(interval)
    }, [isLoading])

    // Complete progress when scan finishes
    useEffect(() => {
        if (!isLoading && status !== "Ready" && !status.includes("...") && !status.startsWith("Error")) {
            setProgress(100)
        }
    }, [isLoading, status])

    const currentMessage = SCAN_MESSAGES[messageIndex]

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
                <div className="mt-3 px-1">
                    {isLoading ? (
                        <div className="space-y-2">
                            {/* Progress Bar */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200 cursor-pointer shadow-inner">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#F87B1B] via-[#f59e0b] to-[#F87B1B] transition-all duration-150 ease-out relative"
                                            style={{
                                                width: `${progress}%`,
                                                backgroundSize: '200% 100%',
                                                animation: 'shimmer 1.5s infinite linear'
                                            }}
                                        >
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                style={{ animation: 'shimmer 1.5s infinite linear' }} />
                                        </div>
                                        {/* Pulse ring on the edge */}
                                        <div
                                            className="absolute top-0 h-full w-1 bg-white/80 rounded-full shadow-[0_0_8px_2px_rgba(248,123,27,0.6)]"
                                            style={{ left: `calc(${progress}% - 2px)`, display: progress > 2 ? 'block' : 'none' }}
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" sideOffset={8} className="bg-slate-800 text-white">
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        <span>{currentMessage}</span>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                            {/* Progress Text */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-3 w-3 animate-spin text-[#F87B1B]" />
                                    <span
                                        key={messageIndex}
                                        className="text-xs font-medium text-[#F87B1B] animate-fade-in"
                                    >
                                        {currentMessage}...
                                    </span>
                                </div>
                                <span className="text-xs font-semibold text-slate-600">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-medium uppercase tracking-wider ${status === "Ready" ? "text-slate-400" :
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
                    )}
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
