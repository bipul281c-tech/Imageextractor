import Link from "next/link"
import Image from "next/image"
import { pages } from "@/lib/pages-config"

export function Footer() {
  const toolPages = pages.filter(p => p.slug !== "")

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo and branding */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ExtractPics Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-sm font-semibold tracking-tight text-[#11224E]">EXTRACTPICS</span>
          </Link>
        </div>

        {/* Tool Links */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-3 text-center">Our Tools</p>
          <div className="flex flex-wrap justify-center gap-3">
            {toolPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="text-[11px] text-slate-500 hover:text-[#F87B1B] transition-colors"
              >
                {page.shortTitle}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-[10px] text-slate-400">© 2025 ExtractPics.com - Enterprise Grade Image Scraping</div>
          <div className="flex gap-4">
            <Link href="/sitemap.xml" className="text-[10px] font-medium text-slate-500 hover:text-slate-900">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
