"use client"

import { useState, useEffect, useCallback } from "react"
import { Loader2, Zap, Globe, FileText, Cookie, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Status messages that loop every ~15 seconds
const STATUS_MESSAGES = [
    {
        message: "We have started throttling",
        icon: Zap,
        duration: 3500,
        color: "text-amber-500",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200"
    },
    {
        message: "Opening browser",
        icon: Globe,
        duration: 3500,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
    },
    {
        message: "Loading page",
        icon: FileText,
        duration: 4000,
        color: "text-purple-500",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200"
    },
    {
        message: "Getting you your butter",
        icon: Cookie,
        duration: 4000,
        color: "text-orange-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
    },
]

// Total cycle time is ~15 seconds (3.5 + 3.5 + 4 + 4 = 15)
const TOTAL_CYCLE_TIME = STATUS_MESSAGES.reduce((acc, msg) => acc + msg.duration, 0)

interface ScrapingStatusProps {
    isLoading: boolean
    className?: string
}

export function ScrapingStatus({ isLoading, className }: ScrapingStatusProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState("")
    const [isTyping, setIsTyping] = useState(true)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [cycleCount, setCycleCount] = useState(0)

    // Get current message data
    const currentMessage = STATUS_MESSAGES[currentIndex]
    const Icon = currentMessage.icon

    // Typewriter effect
    useEffect(() => {
        if (!isLoading) {
            setDisplayedText("")
            setCurrentIndex(0)
            setIsTyping(true)
            setElapsedTime(0)
            setCycleCount(0)
            return
        }

        const fullText = currentMessage.message
        let charIndex = 0
        setDisplayedText("")
        setIsTyping(true)

        // Type out the text character by character
        const typeInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                setDisplayedText(fullText.slice(0, charIndex + 1))
                charIndex++
            } else {
                setIsTyping(false)
                clearInterval(typeInterval)
            }
        }, 50) // 50ms per character for smooth typing

        return () => clearInterval(typeInterval)
    }, [isLoading, currentIndex, currentMessage.message])

    // Progress through messages in a loop
    useEffect(() => {
        if (!isLoading) return

        const timer = setTimeout(() => {
            setCurrentIndex(prev => {
                const nextIndex = (prev + 1) % STATUS_MESSAGES.length
                if (nextIndex === 0) {
                    setCycleCount(c => c + 1)
                }
                return nextIndex
            })
        }, currentMessage.duration)

        return () => clearTimeout(timer)
    }, [isLoading, currentIndex, currentMessage.duration])

    // Track elapsed time
    useEffect(() => {
        if (!isLoading) {
            setElapsedTime(0)
            return
        }

        const interval = setInterval(() => {
            setElapsedTime(prev => prev + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [isLoading])

    if (!isLoading) return null

    return (
        <div className={cn("flex flex-col items-center gap-4", className)}>
            {/* Interactive Tooltip-style status */}
            <div
                className={cn(
                    "relative px-6 py-4 rounded-xl border-2 shadow-lg transition-all duration-500 transform",
                    currentMessage.bgColor,
                    currentMessage.borderColor,
                    "animate-pulse-subtle"
                )}
            >
                {/* Tooltip arrow */}
                <div
                    className={cn(
                        "absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-l-2 border-t-2",
                        currentMessage.bgColor,
                        currentMessage.borderColor
                    )}
                />

                {/* Content */}
                <div className="flex items-center gap-3">
                    {/* Animated icon */}
                    <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm",
                        currentMessage.color
                    )}>
                        <Icon className="h-5 w-5 animate-bounce" />
                    </div>

                    {/* Message with typewriter effect */}
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-base font-semibold tracking-wide",
                            currentMessage.color
                        )}>
                            {displayedText}
                            {isTyping && (
                                <span className="inline-block w-0.5 h-5 ml-0.5 bg-current animate-blink" />
                            )}
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5">
                            Please wait...
                        </span>
                    </div>

                    {/* Loading spinner */}
                    <Loader2 className={cn("h-5 w-5 animate-spin ml-2", currentMessage.color)} />
                </div>
            </div>

            {/* Progress indicator dots */}
            <div className="flex items-center gap-2">
                {STATUS_MESSAGES.map((msg, index) => (
                    <div
                        key={msg.message}
                        className={cn(
                            "transition-all duration-500 rounded-full",
                            index === currentIndex
                                ? cn("w-6 h-2", msg.color.replace("text-", "bg-"))
                                : "w-2 h-2 bg-slate-300"
                        )}
                    />
                ))}
            </div>

            {/* Elapsed time and cycle info */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                    <span className="font-mono">{elapsedTime}s</span> elapsed
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>Cycle {cycleCount + 1}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-slate-400">Almost there!</span>
            </div>

            {/* Completed steps badges */}
            {currentIndex > 0 && (
                <div className="flex flex-wrap justify-center gap-2 max-w-md">
                    {STATUS_MESSAGES.slice(0, currentIndex).map((msg) => (
                        <div
                            key={msg.message}
                            className={cn(
                                "flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border",
                                "bg-green-50 border-green-200 text-green-600"
                            )}
                        >
                            <CheckCircle className="h-3 w-3" />
                            <span>{msg.message}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
