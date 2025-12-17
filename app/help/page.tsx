import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Help & FAQ - ExtractPics Image Extraction Tool",
  description: "Get help with ExtractPics. Find answers to frequently asked questions about extracting and downloading images from websites.",
  alternates: {
    canonical: "/help",
  },
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-[#F87B1B]" />
          </div>
          <h1 className="text-4xl font-bold text-[#11224E] mb-4">
            Help Center
          </h1>
          <p className="text-xl text-slate-600">
            Find answers to common questions about using ExtractPics
          </p>
        </div>

        {/* Getting Started */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#11224E] mb-6">Getting Started</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">How do I extract images from a website?</h3>
              <p className="text-slate-600 text-sm mb-3">
                It's simple! Just follow these steps:
              </p>
              <ol className="list-decimal list-inside text-slate-600 text-sm space-y-2 ml-4">
                <li>Copy the URL of the webpage you want to extract images from</li>
                <li>Paste the URL into the search box on our homepage</li>
                <li>Click the "Extract Images" or scan button</li>
                <li>Wait a few seconds while we scan the page</li>
                <li>Preview all extracted images and download the ones you need</li>
              </ol>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Do I need to create an account?</h3>
              <p className="text-slate-600 text-sm">
                No! ExtractPics is completely free and requires no signup or account. Just visit the site and start extracting images immediately.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Is ExtractPics really free?</h3>
              <p className="text-slate-600 text-sm">
                Yes, 100% free. No hidden fees, no premium tiers, no subscriptions. We believe everyone should have access to simple image extraction tools.
              </p>
            </div>
          </div>
        </section>

        {/* Features & Functionality */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#11224E] mb-6">Features & Functionality</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">What types of images can I extract?</h3>
              <p className="text-slate-600 text-sm">
                ExtractPics supports all major image formats including JPG, PNG, GIF, WebP, SVG, BMP, and more. We extract images from HTML img tags, CSS backgrounds, and inline styles.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Can I download multiple images at once?</h3>
              <p className="text-slate-600 text-sm">
                Absolutely! After extracting images, you can select multiple images and download them all as a ZIP file. Use the "Select All" button to quickly select everything, or manually choose specific images.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">How do the filters work?</h3>
              <p className="text-slate-600 text-sm">
                Our filtering system lets you narrow down results by:
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 ml-4 mt-2">
                <li><strong>Format:</strong> Filter by JPG, PNG, GIF, WebP, or SVG</li>
                <li><strong>Size:</strong> Set minimum width to filter out small icons</li>
                <li><strong>Dimensions:</strong> Sort by image dimensions</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Does image quality get reduced?</h3>
              <p className="text-slate-600 text-sm">
                No! We download images in their original quality as hosted on the website. There's no compression or quality loss during extraction.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Questions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#11224E] mb-6">Technical Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Which websites are supported?</h3>
              <p className="text-slate-600 text-sm">
                ExtractPics works with most public websites including blogs, portfolios, e-commerce sites, galleries, social media pages (public content), and more. We cannot access password-protected sites or content behind logins.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Why can't I extract images from certain sites?</h3>
              <p className="text-slate-600 text-sm">
                Some websites may block automated extraction, require login, or use special protections. Additionally, private content, password-protected pages, and some dynamic sites may not work. We can only extract from publicly accessible content.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">How many images can I extract at once?</h3>
              <p className="text-slate-600 text-sm">
                There's no hard limit! Our tool can handle hundreds of images from a single page. However, extremely large pages (1000+ images) may take longer to process.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Do you store my data or images?</h3>
              <p className="text-slate-600 text-sm">
                No. We don't store any images you extract or keep records of URLs you scan. Everything happens in real-time and nothing is saved on our servers. Your privacy is important to us.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Is there a rate limit?</h3>
              <p className="text-slate-600 text-sm">
                We have reasonable rate limits to ensure service quality for all users. If you're extracting large volumes, you may see a queue system activate. This ensures fair access for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Legal & Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#11224E] mb-6">Legal & Privacy</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Is it legal to download images from websites?</h3>
              <p className="text-slate-600 text-sm">
                ExtractPics is a tool - legality depends on how you use it. You should only download images you have permission to use. Respect copyright laws, intellectual property rights, and website terms of service. Our tool is intended for:
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 ml-4 mt-2">
                <li>Downloading your own content</li>
                <li>Public domain or Creative Commons images</li>
                <li>Content you have rights to use</li>
                <li>Personal research and archiving (fair use)</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Can I extract copyrighted images?</h3>
              <p className="text-slate-600 text-sm">
                While you can technically extract any publicly visible image, using copyrighted content without permission is illegal. Always respect copyright and only download images you're authorized to use.
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#11224E] mb-6">Troubleshooting</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">The tool isn't finding all images on a page. Why?</h3>
              <p className="text-slate-600 text-sm">
                Some reasons this might happen:
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 ml-4 mt-2">
                <li>Images load dynamically as you scroll (lazy loading)</li>
                <li>Some images are behind authentication</li>
                <li>Images are loaded via JavaScript after page load</li>
                <li>The website blocks automated tools</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">Extraction is taking a long time. What should I do?</h3>
              <p className="text-slate-600 text-sm">
                Large pages with many images naturally take longer. If it's taking more than 30 seconds, try refreshing and scanning again. If the problem persists, the website might have protections against automated extraction.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-[#11224E] mb-2">I'm getting an error message. What does it mean?</h3>
              <p className="text-slate-600 text-sm">
                Common errors and solutions:
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 ml-4 mt-2">
                <li><strong>"Failed to scrape":</strong> The website may be blocking us or the URL is incorrect</li>
                <li><strong>"Invalid URL":</strong> Check that you pasted the complete URL including http:// or https://</li>
                <li><strong>"No images found":</strong> The page genuinely has no images, or they're loaded dynamically</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-[#11224E] to-[#1a3570] rounded-lg p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for? Check out our other tools or start extracting images to see how it works!
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
