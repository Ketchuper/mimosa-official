import type { Metadata } from 'next'
import Link from 'next/link'
import { LatestNews } from '@/components/latest-news'
import { newsData } from '@/lib/news'

export const metadata: Metadata = {
  title: 'ニュース | MIMO$A',
  description: 'MIMO$Aの最新ニュース、リリース、イベント情報。',
}

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
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
