import Link from 'next/link'
import { LatestNews } from '@/components/latest-news'
import { newsData } from '@/lib/news'
import { newsPageJsonLd } from '@/lib/site-structured-data'
import { SITE_URL, sitePageMetadata } from '@/lib/store-seo'

export const metadata = sitePageMetadata({
  title: 'ニュース | MIMO$A',
  description: 'MIMO$Aの最新ニュース、リリース、イベント情報。',
  path: '/news',
  locale: 'ja_JP',
})

export default function NewsPage() {
  const jsonLd = newsPageJsonLd(SITE_URL)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <header className="border-b border-white/10 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link className="font-[var(--font-display)] text-2xl tracking-wider" href="/">MIMO$A</Link>
          <Link className="text-sm text-primary hover:underline" href="/#news">← トップへ戻る</Link>
        </div>
      </header>
      <LatestNews items={newsData} showArchiveLink={false} />
    </main>
  )
}
