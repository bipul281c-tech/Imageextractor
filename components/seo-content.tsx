import { Download, Filter, Zap, Globe, Shield, Layers } from "lucide-react"

const features = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Extract images in seconds with our high-performance scraping engine."
    },
    {
        icon: Filter,
        title: "Smart Filtering",
        description: "Filter by format (JPG, PNG, WebP, GIF, SVG) and minimum width."
    },
    {
        icon: Download,
        title: "Bulk Download",
        description: "Download all images at once as a convenient ZIP file."
    },
    {
        icon: Globe,
        title: "Any Website",
        description: "Works with most websites - blogs, portfolios, galleries, and more."
    },
    {
        icon: Shield,
        title: "Privacy First",
        description: "We don't store your URLs or downloaded images. Your data stays yours."
    },
    {
        icon: Layers,
        title: "All Formats",
        description: "Detects JPG, PNG, WebP, GIF, SVG, ICO, and other image formats."
    }
]

export function SEOContent() {
    return (
        <section className="mt-16 border-t border-gray-200 pt-16" aria-labelledby="features-heading">
            <div className="max-w-4xl mx-auto">
                {/* How it Works */}
                <article className="mb-12">
                    <h2 id="features-heading" className="text-2xl font-semibold text-[#11224E] text-center mb-4">
                        How to Extract Images from Any Website
                    </h2>
                    <p className="text-sm text-slate-600 text-center max-w-2xl mx-auto mb-8">
                        ExtractPics makes it easy to download images from any webpage. Simply paste a URL,
                        scan for images, filter by your preferences, and download. No installation required.
                    </p>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="text-center p-6 rounded-lg bg-white border border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-[#11224E] text-white flex items-center justify-center text-sm font-semibold mx-auto mb-3">1</div>
                            <h3 className="text-sm font-semibold text-[#11224E] mb-2">Step 1: Paste URL</h3>
                            <p className="text-xs text-slate-500">Enter any website URL in the search bar above</p>
                        </div>
                        <div className="text-center p-6 rounded-lg bg-white border border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-[#11224E] text-white flex items-center justify-center text-sm font-semibold mx-auto mb-3">2</div>
                            <h3 className="text-sm font-semibold text-[#11224E] mb-2">Step 2: Scan & Filter</h3>
                            <p className="text-xs text-slate-500">Click scan and filter images by format or size</p>
                        </div>
                        <div className="text-center p-6 rounded-lg bg-white border border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-[#11224E] text-white flex items-center justify-center text-sm font-semibold mx-auto mb-3">3</div>
                            <h3 className="text-sm font-semibold text-[#11224E] mb-2">Step 3: Download</h3>
                            <p className="text-xs text-slate-500">Download individual images or all as ZIP</p>
                        </div>
                    </div>
                </article>

                {/* Features Grid */}
                <article>
                    <h2 className="text-xl font-semibold text-[#11224E] text-center mb-6">
                        Why Choose ExtractPics?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <feature.icon className="h-5 w-5 text-slate-700 mb-3" />
                                <h3 className="text-sm font-semibold text-[#11224E] mb-1">{feature.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    )
}
