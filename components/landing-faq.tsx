"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQItem {
    question: string
    answer: string
}

interface LandingFAQProps {
    items: FAQItem[]
    title?: string
}

export function LandingFAQ({ items, title = "Frequently Asked Questions" }: LandingFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    // FAQ Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    }

    return (
        <section className="mt-16 mb-8" aria-labelledby="landing-faq-heading">
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto">
                <h2 id="landing-faq-heading" className="text-2xl font-semibold text-[#11224E] text-center mb-8">
                    {title}
                </h2>

                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-all duration-200 group"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-base font-medium text-[#11224E] group-hover:text-sky-600 transition-colors">
                                    {item.question}
                                </span>
                                <ChevronDown
                                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-sky-500' : ''
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-5 animate-in fade-in slide-in-from-top-1 duration-200">
                                    <p className="text-slate-600 leading-relaxed">
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
