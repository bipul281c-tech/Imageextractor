"use client"

import { useMemo } from "react"
import { Link, AlertCircle } from "lucide-react"
import { getUrlCount, parseUrlsFromInput, validateUrls } from "@/lib/parse-urls"

interface BatchUrlInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  maxUrls?: number
}

export function BatchUrlInput({
  value,
  onChange,
  disabled = false,
  maxUrls = 5
}: BatchUrlInputProps) {
  const urlStats = useMemo(() => {
    const parsed = parseUrlsFromInput(value, maxUrls)
    const { valid, invalid } = validateUrls(parsed)
    return {
      total: parsed.length,
      valid: valid.length,
      invalid: invalid.length,
      isOverLimit: parsed.length > maxUrls
    }
  }, [value, maxUrls])

  const showWarning = urlStats.invalid > 0 || urlStats.isOverLimit

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <div className="absolute left-3 top-3 text-slate-400 pointer-events-none">
          <Link className="h-4 w-4" strokeWidth={1.5} />
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={`Enter up to ${maxUrls} URLs (one per line)\n\nhttps://example.com\nhttps://another-site.com`}
          className="w-full min-h-[120px] pl-10 pr-3 py-3 text-sm text-slate-900 placeholder-slate-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed resize-y"
          rows={5}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        {showWarning ? (
          <div className="flex items-center gap-1.5 text-amber-600">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>
              {urlStats.isOverLimit && `Only first ${maxUrls} URLs will be processed. `}
              {urlStats.invalid > 0 && `${urlStats.invalid} invalid URL${urlStats.invalid > 1 ? 's' : ''} found.`}
            </span>
          </div>
        ) : urlStats.valid > 0 ? (
          <div className="flex items-center gap-1.5 text-green-600 font-medium">
            <span>✓ {urlStats.valid} valid URL{urlStats.valid > 1 ? 's' : ''} ready</span>
          </div>
        ) : (
          <span className="text-slate-400">Enter URLs to extract images</span>
        )}

        <span className="text-slate-500 font-medium">
          {urlStats.total} / {maxUrls}
        </span>
      </div>
    </div>
  )
}
