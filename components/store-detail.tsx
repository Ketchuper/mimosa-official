import Image from 'next/image'
import Link from 'next/link'
import type { Locale, Store } from '@/lib/stores'
import { storePath } from '@/lib/stores'
import { localBusinessJsonLd } from '@/lib/store-seo'

export function StoreDetail({ store, locale }: { store: Store; locale: Locale }) {
  const en = locale === 'en'
  const copy = store.copy[locale]
  const jsonLd = localBusinessJsonLd(store, locale)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      <header className="border-b border-white/10 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link className="font-[var(--font-display)] text-2xl tracking-wider" href="/#spots">MIMO$A</Link>
          <nav aria-label={en ? 'Language' : '言語'} className="flex items-center gap-4 text-sm">
            <Link className={en ? 'text-white/60 hover:text-white' : 'text-primary'} href={storePath(store.slug, 'ja')} hrefLang="ja">JP</Link>
            <Link className={en ? 'text-primary' : 'text-white/60 hover:text-white'} href={storePath(store.slug, 'en')} hrefLang="en">EN</Link>
          </nav>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-5 pb-20 pt-10 md:px-10 md:pt-16">
        <Link className="text-sm text-primary hover:underline" href="/#spots">← {en ? 'All shops' : '店舗一覧へ'}</Link>
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] md:gap-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">{store.area[locale]}</p>
            <h1 className="font-[var(--font-display)] text-5xl leading-tight md:text-7xl">{store.name}</h1>
            <p className="mt-5 text-lg text-white/70">{copy.category}</p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/85 md:text-lg">{copy.description}</p>
            {store.status === 'preopening' && (
              <p className="mt-8 inline-block rounded-full border border-primary/70 px-4 py-2 text-sm font-bold text-primary">
                {en ? 'Preparing to open' : '開業準備中'}
              </p>
            )}
            {copy.highlights.length > 0 && (
              <section className="mt-12" aria-label={en ? 'Highlights' : '特徴'}>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">{en ? 'Highlights' : 'この店について'}</h2>
                <ul className="flex flex-wrap gap-2">
                  {copy.highlights.map((highlight) => <li key={highlight} className="rounded-full border border-white/20 px-4 py-2 text-sm">{highlight}</li>)}
                </ul>
              </section>
            )}
          </div>
          {store.image ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/5 md:aspect-square">
              <Image src={store.image} alt={store.name} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" priority />
            </div>
          ) : (
            <div aria-hidden="true" className="flex aspect-[4/3] items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-[#153811] via-[#111] to-black md:aspect-square">
              <span className="font-[var(--font-display)] text-4xl tracking-widest text-white/80 md:text-5xl">MIMO$A</span>
            </div>
          )}
        </div>

        <section className="mt-16 border-t border-white/15 pt-10" aria-labelledby="store-access">
          <h2 id="store-access" className="font-[var(--font-display)] text-3xl">{en ? 'VISIT & CONTACT' : 'アクセス・連絡先'}</h2>
          {store.status === 'open' ? (
            <>
              {store.address && <p className="mt-5 text-white/80">{store.address[locale]}</p>}
              {!store.address && <p className="mt-5 text-white/80">{store.area[locale]}</p>}
              {store.hours && <p className="mt-2 text-white/80">{store.hours[locale]}</p>}
              {!store.hours && <p className="mt-2 text-sm text-white/60">{en ? 'Please check the latest hours before visiting.' : '営業時間は来店前に最新情報をご確認ください。'}</p>}
              <div className="mt-7 flex flex-wrap gap-3">
                {store.mapUrl && <a className="rounded bg-primary px-5 py-3 font-bold text-black hover:opacity-85" href={store.mapUrl} target="_blank" rel="noopener noreferrer">{en ? 'Open map' : '地図を見る'}</a>}
                {store.contactUrl && <a className="rounded border border-white/30 px-5 py-3 font-bold hover:border-primary" href={store.contactUrl} target="_blank" rel="noopener noreferrer">{en ? 'Latest updates / contact' : '最新情報・お問い合わせ'}</a>}
              </div>
            </>
          ) : (
            <p className="mt-5 max-w-2xl leading-8 text-white/75">{en ? 'This location is preparing to open. We will share its address, opening date and contact details after they are confirmed.' : '現在、開業準備中です。住所・開業日・連絡先は確定後にご案内します。'}</p>
          )}
        </section>
      </article>
    </main>
  )
}
