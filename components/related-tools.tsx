"use client"

import Link from "next/link"
import { getRelatedPages } from "@/lib/pages-config"
import { Download, Link2, Layers, ExternalLink, Film, Home, ArrowRight, Globe, Link as LinkIcon, Facebook } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
    Home,
    Download,
    Link2,
    Layers,
    ExternalLink,
    Film,
    Globe,
    Link: LinkIcon,
    Facebook,
}

interface RelatedToolsProps {
    currentSlug: string
    title?: string
}

export function RelatedTools({ currentSlug, title = "Explore More Tools" }: RelatedToolsProps) {
    const relatedPages = getRelatedPages(currentSlug)

    return (
        <section className="mt-16 border-t border-gray-200 pt-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold text-[#11224E] text-center mb-6">
                    {title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedPages.filter(p => p.slug !== "").map((page) => {
                        const IconComponent = iconMap[page.icon] || Home
                        return (
                            <Link
                                key={page.slug}
                                href={`/${page.slug}`}
                                className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-[#F87B1B] hover:shadow-md transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors">
                                        <IconComponent className="h-5 w-5 text-slate-600 group-hover:text-[#F87B1B]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-[#11224E] group-hover:text-[#F87B1B] transition-colors">
                                            {page.shortTitle}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                            {page.description.slice(0, 80)}...
                                        </p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#F87B1B] group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Back to Home Link */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-[#F87B1B] transition-colors"
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Back to ExtractPics Home</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

// Compact inline links for within content
export function InlineToolLinks({ exclude = "" }: { exclude?: string }) {
    const relatedPages = getRelatedPages(exclude).filter(p => p.slug !== "")

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {relatedPages.slice(0, 4).map((page) => (
                <Link
                    key={page.slug}
                    href={`/${page.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:border-[#F87B1B] hover:text-[#F87B1B] transition-colors"
                >
                    {page.shortTitle}
                </Link>
            ))}
        </div>
    )
}
