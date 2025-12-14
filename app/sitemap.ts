import { MetadataRoute } from 'next'
import { pages, siteConfig } from '@/lib/pages-config'

export default function sitemap(): MetadataRoute.Sitemap {
    return pages.map(page => ({
        url: `${siteConfig.url}${page.slug ? `/${page.slug}` : ""}`,
        lastModified: new Date(),
        changeFrequency: page.slug ? 'monthly' : 'weekly',
        priority: page.priority,
    }))
}
