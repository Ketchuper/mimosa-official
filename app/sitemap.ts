import type { MetadataRoute } from 'next'
import { stores, storePath } from '@/lib/stores'
import { SITE_URL } from '@/lib/store-seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL },
    ...stores.flatMap((store) => (['ja', 'en'] as const).map((locale) => ({
      url: `${SITE_URL}${storePath(store.slug, locale)}`,
      alternates: {
        languages: {
          ja: `${SITE_URL}${storePath(store.slug, 'ja')}`,
          en: `${SITE_URL}${storePath(store.slug, 'en')}`,
        },
      },
    }))),
  ]
}
