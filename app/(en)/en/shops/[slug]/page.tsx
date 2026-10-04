import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StoreDetail } from '@/components/store-detail'
import { getStore, stores } from '@/lib/stores'
import { storeMetadata } from '@/lib/store-seo'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return stores.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = getStore((await params).slug)
  if (!store) notFound()
  return storeMetadata(store, 'en')
}

export default async function StorePage({ params }: Props) {
  const store = getStore((await params).slug)
  if (!store) notFound()
  return <StoreDetail store={store} locale="en" />
}
