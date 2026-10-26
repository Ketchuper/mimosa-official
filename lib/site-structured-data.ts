export function homepageJsonLd(siteUrl: string) {
  const organizationId = `${siteUrl}/#organization`
  const websiteId = `${siteUrl}/#website`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'MIMO$A',
        description: '沖縄を拠点に、飲食・アパレル・エンターテインメントの店舗を運営しています。古着と音楽、食と夜の場づくりを通じて、街に残る場所をつくり続けています。',
        url: `${siteUrl}/`,
        logo: `${siteUrl}/images/mimosa-logo.png`,
        email: 'contact@m-i-m-o-s-a.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '諸見里1丁目25-8 ハピネスプラザビル702',
          addressLocality: '沖縄市',
          addressRegion: '沖縄県',
          postalCode: '904-0032',
          addressCountry: 'JP',
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: 'MIMO$A',
        url: `${siteUrl}/`,
        inLanguage: ['ja', 'en'],
        publisher: { '@id': organizationId },
      },
    ],
  }
}

export function newsPageJsonLd(siteUrl: string) {
  const websiteId = `${siteUrl}/#website`
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/news#webpage`,
    name: 'ニュース | MIMO$A',
    description: 'MIMO$Aの最新ニュース、リリース、イベント情報。',
    url: `${siteUrl}/news`,
    inLanguage: 'ja',
    isPartOf: { '@id': websiteId },
  }
}
