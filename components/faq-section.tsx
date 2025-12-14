"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQItem {
    question: string
    answer: string
}

const faqItems: FAQItem[] = [
    {
        question: "How do I extract images from a website?",
        answer: "Simply paste the URL of any website into the search bar and click 'Scan'. ExtractPics will automatically detect and display all images found on that page. You can then filter by format or size and download individual images or all of them as a ZIP file."
    },
    {
        question: "Is ExtractPics free to use?",
        answer: "Yes! ExtractPics offers free image extraction with a daily limit of 5 scans. This is perfect for personal use and small projects. For unlimited access, consider our premium plans."
    },
    {
        question: "What image formats are supported?",
        answer: "ExtractPics detects and extracts all common image formats including JPG/JPEG, PNG, WebP, GIF, SVG, and more. You can filter results by format to find exactly what you need."
    },
    {
        question: "Can I download multiple images at once?",
        answer: "Absolutely! After scanning a website, you can select multiple images and download them all as a single ZIP file. This makes bulk downloading quick and convenient."
    },
    {
        question: "Is it legal to extract images from websites?",
        answer: "Image extraction for personal use, research, or with permission is generally acceptable. However, always respect copyright and terms of service. ExtractPics is a tool - users are responsible for ensuring they have the right to use downloaded images."
    },
    {
        question: "Why can't ExtractPics find images on some websites?",
        answer: "Some websites use advanced techniques to load images dynamically or protect their content. Additionally, images loaded via JavaScript after the initial page load may not always be detected. We're constantly improving our detection algorithms."
    }
]

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    // FAQ Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    }

    return (
        <section className="mt-16 mb-8" aria-labelledby="faq-heading">
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-3xl mx-auto">
                <h2 id="faq-heading" className="text-2xl font-semibold text-[#11224E] text-center mb-8">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-sm font-medium text-[#11224E]">{item.question}</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-slate-500 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-5 pb-4">
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
