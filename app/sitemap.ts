import type { MetadataRoute } from 'next'
import { publicStores, storePath } from '@/lib/stores'
import { SITE_URL } from '@/lib/store-seo'
import { buildSitemapEntries } from '@/lib/sitemap-data.mjs'

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries({ siteUrl: SITE_URL, stores: publicStores, pathForStore: storePath })
}
