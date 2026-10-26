const pageLastModified = {
  // d35e80d changed visible store-card content on the homepage.
  home: '2026-10-10',
  // 7f1a60a added the latest news content; 188ff16 published the archive route.
  news: '2026-10-06',
}

export function buildSitemapEntries({ siteUrl, stores, pathForStore }) {
  return [
    { url: siteUrl, lastModified: pageLastModified.home },
    { url: `${siteUrl}/news`, lastModified: pageLastModified.news },
    ...stores.flatMap((store) => (['ja', 'en']).map((locale) => ({
      url: `${siteUrl}${pathForStore(store.slug, locale)}`,
      lastModified: store.sitemapLastModified,
      alternates: {
        languages: {
          ja: `${siteUrl}${pathForStore(store.slug, 'ja')}`,
          en: `${siteUrl}${pathForStore(store.slug, 'en')}`,
        },
      },
    }))),
  ]
}
