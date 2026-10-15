export function buildSitemapEntries({ siteUrl, stores, pathForStore }) {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/news` },
    ...stores.flatMap((store) => (['ja', 'en']).map((locale) => ({
      url: `${siteUrl}${pathForStore(store.slug, locale)}`,
      alternates: {
        languages: {
          ja: `${siteUrl}${pathForStore(store.slug, 'ja')}`,
          en: `${siteUrl}${pathForStore(store.slug, 'en')}`,
        },
      },
    }))),
  ]
}
