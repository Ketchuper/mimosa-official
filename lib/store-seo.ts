import type { Locale, Store } from './stores'

export const SITE_URL = 'https://www.m-i-m-o-s-a.com'

function pathFor(store: Store, locale: Locale) {
  return `${locale === 'en' ? '/en' : ''}/shops/${store.slug}`
}

export function storeMetadata(store: Store, locale: Locale) {
  const statusLabel = store.status === 'preopening'
    ? (locale === 'ja' ? '・開業準備中' : ' · Preparing to open')
    : store.status === 'closed'
      ? (locale === 'ja' ? '・閉店' : ' · Closed')
      : ''
  const title = `${store.name} | ${store.area[locale]}${statusLabel} | MIMO$A`
  const path = pathFor(store, locale)
  return {
    title,
    description: store.copy[locale].description,
    alternates: {
      canonical: path,
      languages: {
        ja: pathFor(store, 'ja'),
        en: pathFor(store, 'en'),
        'x-default': pathFor(store, 'ja'),
      },
    },
    openGraph: {
      title,
      description: store.copy[locale].description,
      url: path,
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      images: store.image ? [store.image] : undefined,
    },
  }
}

export function localBusinessJsonLd(store: Store, locale: Locale) {
  if (store.status !== 'open' || !store.address) return undefined

  const url = `${SITE_URL}${pathFor(store, locale)}`
  return {
    '@context': 'https://schema.org',
    '@type': store.category,
    '@id': `${SITE_URL}${pathFor(store, 'ja')}#business`,
    name: store.name,
    description: store.copy[locale].description,
    url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address.streetAddress,
      addressLocality: store.address.locality,
      addressRegion: 'Okinawa',
      postalCode: store.address.postalCode,
      addressCountry: 'JP',
    },
    image: store.image ? `${SITE_URL}${store.image}` : undefined,
    telephone: store.phone,
    sameAs: store.contactUrl ? [store.contactUrl] : undefined,
  }
}
