import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Check, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing - ExtractPics is 100% Free Forever",
  description: "ExtractPics is completely free with unlimited image extractions. No hidden fees, no premium tiers, no subscriptions. Start extracting images now.",
  alternates: {
    canonical: "/pricing",
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-50 text-[#F87B1B] rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            100% Free Forever
          </div>
          <h1 className="text-4xl font-bold text-[#11224E] mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            ExtractPics is completely free. No hidden fees, no premium plans, no catches.
            Just unlimited image extraction for everyone.
          </p>
        </div>

        {/* Free Plan Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl border-2 border-[#F87B1B] p-8 relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-[#F87B1B] text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
              MOST POPULAR
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#11224E] mb-2">Free Plan</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-[#11224E]">$0</span>
                <span className="text-slate-500">/forever</span>
              </div>
              <p className="text-slate-600 mt-3">
                Everything you need to extract and download images from any website
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-50 rounded-full flex-shrink-0">
                  <Check className="h-4 w-4 text-[#F87B1B]" />
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-[#11224E]">Unlimited extractions</span> - Extract as many images as you need
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-50 rounded-full flex-shrink-0">
                  <Check className="h-4 w-4 text-[#F87B1B]" />
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-[#11224E]">All formats supported</span> - JPG, PNG, GIF, WebP, SVG, and more
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-50 rounded-full flex-shrink-0">
                  <Check className="h-4 w-4 text-[#F87B1B]" />
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-[#11224E]">Bulk download as ZIP</span> - Download hundreds of images at once
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-50 rounded-full flex-shrink-0">
                  <Check className="h-4 w-4 text-[#F87B1B]" />
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-[#11224E]">Advanced filters</span> - Filter by format, size, and dimensions
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-50 rounded-full flex-shrink-0">
                  <Check className="h-4 w-4 text-[#F87B1B]" />
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-[#11224E]">No signup required</span> - Start using immediately, no account needed
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-50 rounded-full flex-shrink-0">
                  <Check className="h-4 w-4 text-[#F87B1B]" />
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-[#11224E]">No watermarks</span> - Download images in original quality
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-50 rounded-full flex-shrink-0">
                  <Check className="h-4 w-4 text-[#F87B1B]" />
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-[#11224E]">Privacy focused</span> - We don't store your data or track activity
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-50 rounded-full flex-shrink-0">
                  <Check className="h-4 w-4 text-[#F87B1B]" />
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-[#11224E]">Fast extraction</span> - Extract hundreds of images in seconds
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-orange-50 rounded-full flex-shrink-0">
                  <Check className="h-4 w-4 text-[#F87B1B]" />
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-[#11224E]">Multiple tools</span> - Image downloader, link extractor, bulk tools, and more
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="/"
              className="block w-full py-4 bg-[#F87B1B] text-white text-center font-semibold rounded-lg hover:bg-[#e06c15] transition-colors"
            >
              Start Extracting Images Now
            </a>
          </div>
        </div>

        {/* Why Free Section */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-[#11224E] mb-6">Why Is ExtractPics Free?</h2>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <p className="text-slate-600 mb-4">
                We believe that simple, useful tools should be accessible to everyone. ExtractPics was built to solve
                a common problem - downloading images from websites - and we want to keep it free for designers,
                developers, students, and anyone who needs it.
              </p>
              <p className="text-slate-600 mb-4">
                We're committed to keeping ExtractPics free forever. No ads, no premium tiers, no hidden fees.
                Just a straightforward tool that does what it says.
              </p>
              <p className="text-slate-600 font-medium text-[#11224E]">
                Our mission is simple: make image extraction easy and accessible for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[#11224E] mb-8 text-center">
            ExtractPics vs. Other Tools
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-lg border border-gray-200">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-[#11224E]">Feature</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-[#F87B1B]">ExtractPics</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-slate-500">Other Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-sm text-slate-600">Price</td>
                  <td className="py-4 px-6 text-center text-sm font-semibold text-[#F87B1B]">Free Forever</td>
                  <td className="py-4 px-6 text-center text-sm text-slate-500">$5-20/month</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-slate-600">Signup Required</td>
                  <td className="py-4 px-6 text-center text-sm font-semibold text-[#F87B1B]">No</td>
                  <td className="py-4 px-6 text-center text-sm text-slate-500">Usually Yes</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-slate-600">Extraction Limit</td>
                  <td className="py-4 px-6 text-center text-sm font-semibold text-[#F87B1B]">Unlimited</td>
                  <td className="py-4 px-6 text-center text-sm text-slate-500">10-50/day</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-slate-600">Bulk Download</td>
                  <td className="py-4 px-6 text-center text-sm font-semibold text-[#F87B1B]">✓</td>
                  <td className="py-4 px-6 text-center text-sm text-slate-500">Premium Only</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-slate-600">Advanced Filters</td>
                  <td className="py-4 px-6 text-center text-sm font-semibold text-[#F87B1B]">✓</td>
                  <td className="py-4 px-6 text-center text-sm text-slate-500">Limited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-slate-600">Watermarks</td>
                  <td className="py-4 px-6 text-center text-sm font-semibold text-[#F87B1B]">None</td>
                  <td className="py-4 px-6 text-center text-sm text-slate-500">On Free Tier</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-sm text-slate-600">Privacy</td>
                  <td className="py-4 px-6 text-center text-sm font-semibold text-[#F87B1B]">No Tracking</td>
                  <td className="py-4 px-6 text-center text-sm text-slate-500">Data Collected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[#11224E] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Will ExtractPics always be free?</h3>
              <p className="text-slate-600 text-sm">
                Yes! We're committed to keeping ExtractPics free forever. No plans for premium tiers or paid subscriptions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Are there any hidden limitations?</h3>
              <p className="text-slate-600 text-sm">
                No hidden limitations. The only fair-use limit is our rate limiting system to ensure service quality for all users.
                You can extract as many images as you need.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Do I need to give credit or attribution?</h3>
              <p className="text-slate-600 text-sm">
                No, you don't need to credit ExtractPics. However, please respect copyright and only download images you have rights to use.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Can I use ExtractPics for commercial projects?</h3>
              <p className="text-slate-600 text-sm">
                Yes, ExtractPics is free for both personal and commercial use. Just make sure you have the rights to use the images you download.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-[#11224E] to-[#1a3570] rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users extracting millions of images with ExtractPics.
              No signup, no credit card, no commitment.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#F87B1B] text-white font-semibold rounded-lg hover:bg-[#e06c15] transition-colors text-lg"
            >
              Start Extracting Images Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
