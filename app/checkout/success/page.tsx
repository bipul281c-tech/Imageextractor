"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
    const [credits, setCredits] = useState<number | null>(null)
    const [planName, setPlanName] = useState<string>("")
    const [syncing, setSyncing] = useState(true)
    const [syncMessage, setSyncMessage] = useState("Activating your subscription...")
    const [syncAttempts, setSyncAttempts] = useState(0)

    useEffect(() => {
        async function syncSubscription() {
            setSyncing(true)

            try {
                const response = await fetch("/api/sync-subscription", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                })

                const data = await response.json()

                if (data.success) {
                    setPlanName(data.plan)
                    setCredits(data.credits)
                    setSyncMessage("Subscription activated!")
                    setSyncing(false)
                } else {
                    // Subscription not found yet, retry after delay
                    if (syncAttempts < 5) {
                        setSyncMessage(`Processing payment... (attempt ${syncAttempts + 1}/5)`)
                        setTimeout(() => {
                            setSyncAttempts(prev => prev + 1)
                        }, 3000)
                    } else {
                        setSyncMessage("Subscription pending. Please refresh in a moment.")
                        setSyncing(false)
                    }
                }
            } catch (error) {
                console.error("Sync error:", error)
                setSyncMessage("Error syncing subscription. Please refresh the page.")
                setSyncing(false)
            }
        }

        syncSubscription()
    }, [syncAttempts])

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8 relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#3ECE8C] to-[#2eb87a] rounded-full mx-auto flex items-center justify-center shadow-lg shadow-[#3ECE8C]/30">
                        <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 left-1/2 ml-8">
                        <Sparkles className="h-8 w-8 text-[#F87B1B] animate-pulse" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-[#11224E] mb-4">
                    Welcome to {planName ? `the ${planName.charAt(0).toUpperCase() + planName.slice(1)} Plan` : "Your Subscription"}!
                </h1>

                <p className="text-slate-600 mb-8">
                    Thank you for subscribing! Your account has been upgraded and your credits are ready to use.
                </p>

                {credits !== null && (
                    <div className="bg-gradient-to-r from-[#11224E] to-[#1a3a7a] rounded-2xl p-6 mb-8 text-white shadow-xl">
                        <p className="text-sm text-white/70 mb-2">Your Monthly Credits</p>
                        <p className="text-4xl font-bold text-[#F87B1B]">
                            {credits.toLocaleString()}
                        </p>
                        <p className="text-sm text-white/70 mt-2">
                            Credits reset on your billing date
                        </p>
                    </div>
                )}

                <div className="space-y-4">
                    <Link href="/">
                        <Button className="w-full py-6 bg-[#F87B1B] hover:bg-[#e06c15] text-white font-semibold">
                            Start Extracting Images
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" className="w-full py-6 border-slate-200">
                            Go to Homepage
                        </Button>
                    </Link>
                </div>

                <p className="text-sm text-slate-500 mt-8">
                    Need help?{" "}
                    <a href="mailto:support@extractpics.com" className="text-[#F87B1B] hover:underline">
                        Contact support
                    </a>
                </p>
            </div>
        </div>
    )
}
