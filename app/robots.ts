import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://extractpics.com'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/private/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
