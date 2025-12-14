"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface QueueWaitingModalProps {
    isVisible: boolean
    queuePosition: number
}

export function QueueWaitingModal({ isVisible, queuePosition }: QueueWaitingModalProps) {
    const [dots, setDots] = useState("")

    // Animated dots effect
    useEffect(() => {
        if (!isVisible) return

        const interval = setInterval(() => {
            setDots(prev => {
                if (prev.length >= 3) return ""
                return prev + "."
            })
        }, 500)

        return () => clearInterval(interval)
    }, [isVisible])

    if (!isVisible) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="queue-modal-title"
        >
            <div className="relative mx-4 w-full max-w-md">
                {/* Animated background glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#F87B1B] via-[#CBD99B] to-[#F87B1B] opacity-75 blur-lg animate-pulse" />

                <div className="relative rounded-2xl bg-[#11224E] p-8 shadow-2xl">
                    {/* Spinner Container */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            {/* Outer ring animation */}
                            <div className="absolute inset-0 h-20 w-20 animate-ping rounded-full bg-[#F87B1B]/20" />
                            <div className="absolute inset-0 h-20 w-20 animate-pulse rounded-full bg-[#CBD99B]/10" />

                            {/* Main spinner */}
                            <div className="relative flex h-20 w-20 items-center justify-center">
                                <Loader2 className="h-12 w-12 animate-spin text-[#F87B1B]" />
                            </div>
                        </div>
                    </div>

                    {/* Queue Position Badge */}
                    <div className="mb-4 flex justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#F87B1B]/10 px-4 py-2 text-[#F87B1B]">
                            <span className="text-xs font-semibold uppercase tracking-wider">Queue Position</span>
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F87B1B] text-sm font-bold text-white">
                                {queuePosition}
                            </span>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="text-center">
                        <h3
                            id="queue-modal-title"
                            className="mb-2 text-xl font-bold text-white"
                        >
                            Please Wait{dots}
                        </h3>
                        <p className="text-sm text-gray-400">
                            Our servers are busy processing other requests.
                            <br />
                            You're <span className="font-semibold text-[#CBD99B]">#{queuePosition}</span> in the queue.
                        </p>
                    </div>

                    {/* Animated progress dots */}
                    <div className="mt-6 flex justify-center gap-2">
                        <span
                            className="h-2 w-2 animate-bounce rounded-full bg-[#F87B1B]"
                            style={{ animationDelay: "0ms" }}
                        />
                        <span
                            className="h-2 w-2 animate-bounce rounded-full bg-[#CBD99B]"
                            style={{ animationDelay: "150ms" }}
                        />
                        <span
                            className="h-2 w-2 animate-bounce rounded-full bg-[#F87B1B]"
                            style={{ animationDelay: "300ms" }}
                        />
                    </div>

                    {/* Subtle message */}
                    <p className="mt-4 text-center text-xs text-gray-500">
                        Your request will start automatically
                    </p>
                </div>
            </div>
        </div>
    )
}
