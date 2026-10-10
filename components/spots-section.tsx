"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { publicStores, storePath } from '@/lib/stores'
import { getSectionTitles } from '@/lib/i18n'

export function SpotsSection() {
  return (
    <section id="spots" className="bg-background px-4 py-24 text-foreground md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground/70">Physical Shop</p>
          <h2 className="font-[var(--font-display)] text-5xl text-foreground md:text-7xl">
            {getSectionTitles().spots.prefix}<span className="text-primary neon-glow">{getSectionTitles().spots.highlight}</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">掲載中の店舗</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {publicStores.map((store, index) => (
            <Link key={store.slug} href={storePath(store.slug, 'ja')} className="group block rounded-lg border border-primary/15 bg-card transition-colors hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.06 }}>
                <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gradient-to-br from-[#153811] via-[#111] to-black">
                  {store.image ? <Image src={store.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /> : <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-[var(--font-display)] text-4xl tracking-widest text-white/60">MIMO$A</span>}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block rounded bg-primary px-2 py-1 text-xs font-bold text-black">{store.area.ja}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-[var(--font-display)] text-xl transition-colors group-hover:text-primary md:text-2xl">{store.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{store.copy.ja.category}</p>
                  <span className="mt-4 inline-block text-sm text-primary">{store.status === 'preopening' ? '開業準備中の情報を見る →' : '店舗情報を見る →'}</span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
