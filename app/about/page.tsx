import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle2, Zap, Shield, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About ExtractPics - Free Online Image Extraction Tool",
  description: "Learn about ExtractPics, the leading free online tool for extracting and downloading images from any website. Fast, secure, and completely free.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#11224E] mb-4">
            About ExtractPics
          </h1>
          <p className="text-xl text-slate-600">
            The fastest, easiest way to extract and download images from any website
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-[#11224E] mb-4">Our Mission</h2>
            <p className="text-slate-600 mb-4">
              ExtractPics was built to solve a simple problem: downloading images from websites shouldn't be complicated.
              Whether you're a designer gathering inspiration, a developer needing assets, or someone wanting to save photos
              from social media, we believe the process should be fast, free, and straightforward.
            </p>
            <p className="text-slate-600">
              We're committed to providing a completely free, no-signup-required tool that respects your privacy while
              delivering professional-grade image extraction capabilities.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[#11224E] mb-8 text-center">Why Choose ExtractPics?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Zap className="h-6 w-6 text-[#F87B1B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#11224E] mb-2">Lightning Fast</h3>
                  <p className="text-sm text-slate-600">
                    Extract hundreds of images in seconds with our optimized scanning engine.
                    No waiting, no delays.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Shield className="h-6 w-6 text-[#F87B1B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#11224E] mb-2">100% Free & Private</h3>
                  <p className="text-sm text-slate-600">
                    No hidden fees, no subscriptions, no account required. We don't store your data
                    or track your activity.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-[#F87B1B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#11224E] mb-2">All Formats Supported</h3>
                  <p className="text-sm text-slate-600">
                    JPG, PNG, GIF, WebP, SVG - we support all major image formats with advanced
                    filtering options.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Heart className="h-6 w-6 text-[#F87B1B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#11224E] mb-2">Built for Professionals</h3>
                  <p className="text-sm text-slate-600">
                    Trusted by designers, developers, and content creators worldwide for bulk
                    image extraction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-[#11224E] to-[#1a3570] rounded-lg p-8 text-white">
            <h2 className="text-2xl font-semibold mb-8 text-center">ExtractPics by the Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#F87B1B] mb-2">1M+</div>
                <div className="text-sm text-gray-300">Images Extracted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#F87B1B] mb-2">100%</div>
                <div className="text-sm text-gray-300">Free Forever</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#F87B1B] mb-2">24/7</div>
                <div className="text-sm text-gray-300">Always Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[#11224E] mb-8 text-center">Who Uses ExtractPics?</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Designers & Creatives</h3>
              <p className="text-sm text-slate-600">
                Gather design inspiration, download reference images, and backup portfolio work from various platforms.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Developers & Webmasters</h3>
              <p className="text-sm text-slate-600">
                Extract assets for testing, download competitor images for analysis, and quickly grab icons and graphics.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Content Creators</h3>
              <p className="text-sm text-slate-600">
                Download social media images, save event photos, and extract thumbnails for video content.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Researchers & Archivists</h3>
              <p className="text-sm text-slate-600">
                Bulk download image collections, archive web content, and preserve visual resources for research.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-[#11224E] mb-4">Ready to Get Started?</h2>
            <p className="text-slate-600 mb-6">
              Start extracting images from any website in seconds. No signup required.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#F87B1B] text-white font-medium rounded-lg hover:bg-[#e06c15] transition-colors"
            >
              Try ExtractPics Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
