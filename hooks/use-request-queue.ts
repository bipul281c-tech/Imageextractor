"use client"

/**
 * Request Queue System - Limits concurrent API requests to 2 at a time
 * Shows animated waiting message for queued requests
 */

import { useState, useCallback, useRef, useEffect } from 'react'

const MAX_CONCURRENT_REQUESTS = 2

interface QueueItem {
    id: string
    execute: () => Promise<void>
    resolve: () => void
}

// Singleton state for the queue (shared across all component instances)
let activeCount = 0
let queue: QueueItem[] = []
let listeners: Set<() => void> = new Set()

const notifyListeners = () => {
    listeners.forEach(listener => listener())
}

const processQueue = () => {
    while (activeCount < MAX_CONCURRENT_REQUESTS && queue.length > 0) {
        const item = queue.shift()!
        activeCount++
        notifyListeners()

        item.execute().finally(() => {
            activeCount--
            item.resolve()
            notifyListeners()
            processQueue() // Process next in queue
        })
    }
}

interface UseRequestQueueReturn {
    isQueued: boolean
    queuePosition: number
    isProcessing: boolean
    activeCount: number
    queueLength: number
    queueRequest: <T>(fn: () => Promise<T>) => Promise<T>
}

export function useRequestQueue(): UseRequestQueueReturn {
    const [, forceUpdate] = useState({})
    const requestIdRef = useRef<string | null>(null)
    const isProcessingRef = useRef(false)

    // Subscribe to queue updates
    useEffect(() => {
        const update = () => forceUpdate({})
        listeners.add(update)
        return () => {
            listeners.delete(update)
        }
    }, [])

    const getQueuePosition = useCallback(() => {
        if (!requestIdRef.current) return -1
        const index = queue.findIndex(item => item.id === requestIdRef.current)
        return index === -1 ? -1 : index + 1
    }, [])

    const queueRequest = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
        const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        requestIdRef.current = requestId

        return new Promise<T>((resolve, reject) => {
            const wrappedFn = async () => {
                isProcessingRef.current = true
                notifyListeners()
                try {
                    const result = await fn()
                    resolve(result)
                } catch (error) {
                    reject(error)
                } finally {
                    isProcessingRef.current = false
                    requestIdRef.current = null
                    notifyListeners()
                }
            }

            if (activeCount < MAX_CONCURRENT_REQUESTS) {
                // Can execute immediately
                activeCount++
                notifyListeners()

                wrappedFn().finally(() => {
                    activeCount--
                    notifyListeners()
                    processQueue()
                })
            } else {
                // Add to queue
                queue.push({
                    id: requestId,
                    execute: wrappedFn,
                    resolve: () => { } // Resolve is handled in wrappedFn
                })
                notifyListeners()
            }
        })
    }, [])

    const queuePosition = getQueuePosition()
    const isQueued = queuePosition > 0
    const isProcessing = isProcessingRef.current

    return {
        isQueued,
        queuePosition,
        isProcessing,
        activeCount,
        queueLength: queue.length,
        queueRequest,
    }
}

// Export for testing/debugging
export const getQueueStats = () => ({
    activeCount,
    queueLength: queue.length,
})
