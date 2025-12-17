"use client"

import { Clock, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { BatchUrlState } from "@/lib/types/scraper"
import { getHostname } from "@/lib/parse-urls"

interface BatchUrlProgressProps {
  progress: BatchUrlState[]
}

export function BatchUrlProgress({ progress }: BatchUrlProgressProps) {
  if (progress.length === 0) return null

  return (
    <div className="w-full space-y-2 mt-4">
      <div className="text-xs font-medium text-slate-600 mb-2">
        Processing {progress.length} URL{progress.length > 1 ? 's' : ''}
      </div>
      <div className="space-y-1.5">
        {progress.map((item, index) => (
          <BatchUrlProgressItem key={`${item.url}-${index}`} {...item} />
        ))}
      </div>
    </div>
  )
}

function BatchUrlProgressItem({ url, status, imageCount, error }: BatchUrlState) {
  const hostname = getHostname(url)

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3.5 w-3.5 text-slate-400" />
      case 'processing':
        return <Loader2 className="h-3.5 w-3.5 text-[#F87B1B] animate-spin" />
      case 'completed':
        return <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
      case 'failed':
        return <XCircle className="h-3.5 w-3.5 text-red-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-slate-50 border-slate-200'
      case 'processing':
        return 'bg-orange-50 border-orange-200'
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'failed':
        return 'bg-red-50 border-red-200'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Waiting...'
      case 'processing':
        return 'Extracting...'
      case 'completed':
        return `Found ${imageCount} image${imageCount !== 1 ? 's' : ''}`
      case 'failed':
        return error || 'Failed'
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg border ${getStatusColor()} transition-colors`}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {getStatusIcon()}
            <span className="text-xs font-medium text-slate-700 truncate">
              {hostname}
            </span>
          </div>
          <div className="text-[10px] font-medium text-slate-600 shrink-0">
            {getStatusText()}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-md">
        <div className="text-xs space-y-1">
          <div className="font-medium">Full URL:</div>
          <div className="text-slate-300 break-all">{url}</div>
          {error && (
            <>
              <div className="font-medium text-red-400 mt-2">Error:</div>
              <div className="text-red-300">{error}</div>
            </>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
