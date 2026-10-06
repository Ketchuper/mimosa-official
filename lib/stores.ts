export type Locale = 'ja' | 'en'
export type StoreStatus = 'open' | 'preopening'

export type Store = {
  slug: string
  name: string
  status?: StoreStatus
  isPublic?: boolean
  category: 'BarOrPub' | 'Restaurant' | 'ClothingStore'
  area: { ja: string; en: string }
  copy: Record<Locale, { category: string; description: string; highlights: string[] }>
  image?: string
  address?: { ja: string; en: string; streetAddress: string; locality: string; postalCode: string }
  hours?: { ja: string; en: string }
  phone?: string
  mapUrl?: string
  contactUrl?: string
  externalSiteUrl?: string
}

export const stores: Store[] = [
  {
    slug: 'bar-chura-kin',
    name: 'Bar CHURA Kin',
    status: 'open',
    isPublic: false,
    category: 'BarOrPub',
    area: { ja: '沖縄県金武町', en: 'Kin, Okinawa' },
    copy: {
      ja: { category: 'バー', description: '金武町、キャンプ・ハンセン近くのバー。カラオケ、オリジナルカクテル、ボードゲームを楽しめます。', highlights: ['カラオケ', 'オリジナルカクテル', 'ボードゲーム'] },
      en: { category: 'Bar', description: 'A bar near Camp Hansen in Kin, Okinawa, with karaoke, original cocktails and board games.', highlights: ['Karaoke', 'Original cocktails', 'Board games'] },
    },
    image: '/images/spots/churakin.png',
    address: { ja: '〒904-1201 沖縄県国頭郡金武町金武4323-1', en: '4323-1 Kin, Kin Town, Okinawa 904-1201, Japan', streetAddress: '4323-1 Kin', locality: 'Kin Town', postalCode: '904-1201' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bar%20CHURA%20kin%20Kin%204323-1',
    contactUrl: 'https://www.instagram.com/barchura.kin/',
    externalSiteUrl: 'https://churagroupjapan.com/',
  },
  {
    slug: 'bar-replica',
    name: 'Bar REPLICA',
    status: 'open',
    isPublic: true,
    category: 'BarOrPub',
    area: { ja: '沖縄県名護市', en: 'Nago, Okinawa' },
    copy: {
      ja: { category: 'ミュージックバー', description: '名護市城のバー。ダーツとカラオケを楽しめる夜のスポットです。', highlights: ['ダーツ', 'カラオケ', '名護市城'] },
      en: { category: 'Music bar', description: 'A bar in Nago, Okinawa, where guests can enjoy darts and karaoke.', highlights: ['Darts', 'Karaoke', 'Central Nago'] },
    },
    image: '/images/spots/replica.png',
    address: { ja: '〒905-0013 沖縄県名護市城1-1-17', en: '1-1-17 Gusuku, Nago, Okinawa 905-0013, Japan', streetAddress: '1-1-17 Gusuku', locality: 'Nago', postalCode: '905-0013' },
    mapUrl: 'https://maps.app.goo.gl/AGW5uiUUDS81NQBi9',
    contactUrl: 'https://www.instagram.com/replica.nago/',
  },
  {
    slug: 'tontonton',
    name: '豚豚豚 金武本店',
    status: 'open',
    isPublic: false,
    category: 'Restaurant',
    area: { ja: '沖縄県金武町', en: 'Kin, Okinawa' },
    copy: {
      ja: { category: 'ラーメン', description: '金武町のラーメン店。豚骨チャーシュー麺、豚豚豚麺、冷製麺「ヤー麺」などを提供しています。', highlights: ['豚骨チャーシュー麺', '豚豚豚麺', 'ヤー麺'] },
      en: { category: 'Ramen', description: 'A ramen restaurant in Kin, Okinawa. Its menu includes tonkotsu chashu ramen, Tontonton ramen and the chilled Yaamen.', highlights: ['Tonkotsu chashu ramen', 'Tontonton ramen', 'Yaamen'] },
    },
    image: '/images/spots/tontonton.png',
    address: { ja: '〒904-1201 沖縄県国頭郡金武町金武4248-3', en: '4248-3 Kin, Kin Town, Okinawa 904-1201, Japan', streetAddress: '4248-3 Kin', locality: 'Kin Town', postalCode: '904-1201' },
    mapUrl: 'https://maps.app.goo.gl/Z81XyhimC7eao5wF9',
    contactUrl: 'https://www.instagram.com/tontonton.okinawa/',
    externalSiteUrl: 'https://greenparkjapan.com/',
  },
  {
    slug: 'mimosa-koza',
    name: 'MIMO$A KOZA',
    status: 'open',
    isPublic: false,
    category: 'ClothingStore',
    area: { ja: '沖縄県沖縄市', en: 'Okinawa City, Okinawa' },
    copy: {
      ja: { category: '古着・カルチャー', description: '沖縄市の古着と音楽のショップ。ヴィンテージを中心にしたセレクトとイベントを発信しています。', highlights: ['ヴィンテージ', 'セレクト古着', '音楽イベント'] },
      en: { category: 'Vintage clothing and culture', description: 'A vintage clothing and music shop in Okinawa City, sharing selected pieces and events.', highlights: ['Vintage clothing', 'Selected pieces', 'Music events'] },
    },
    image: '/images/spots/mimosa.png',
    address: { ja: '〒904-0032 沖縄県沖縄市諸見里1丁目25-8 ハピネスプラザビル702', en: 'Happiness Plaza Building 702, 1-25-8 Moromizato, Okinawa, Okinawa 904-0032, Japan', streetAddress: 'Happiness Plaza Building 702, 1-25-8 Moromizato', locality: 'Okinawa', postalCode: '904-0032' },
    mapUrl: 'https://maps.app.goo.gl/797o4TCYbXZWMYn26',
    contactUrl: 'https://www.instagram.com/mimosa.koza/',
  },
  {
    slug: 'mimosa-gate2',
    name: 'MIMO$A GATE2',
    status: 'preopening',
    isPublic: false,
    category: 'BarOrPub',
    area: { ja: '沖縄県沖縄市', en: 'Okinawa City, Okinawa' },
    copy: {
      ja: { category: 'バー・開業準備中', description: '沖縄市中央で開業準備中のバー。開業日と営業時間は確定後にお知らせします。', highlights: [] },
      en: { category: 'Bar · Preparing to open', description: 'A bar preparing to open in Chuo, Okinawa City. The opening date and hours will be announced when confirmed.', highlights: [] },
    },
    image: '/images/spots/gate2.jpg',
    address: { ja: '〒904-0004 沖縄県沖縄市中央1丁目27-11-3F', en: '3F, 1-27-11 Chuo, Okinawa, Okinawa 904-0004, Japan', streetAddress: '3F, 1-27-11 Chuo', locality: 'Okinawa', postalCode: '904-0004' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E3%80%92904-0004%20%E6%B2%96%E7%B8%84%E7%9C%8C%E6%B2%96%E7%B8%84%E5%B8%82%E4%B8%AD%E5%A4%AE1%E4%B8%81%E7%9B%AE27-11-3F',
  },
  {
    slug: 'heavens-wagyu-sandwich-gate2',
    name: "Heaven's Wagyu Sandwich GATE2",
    status: 'preopening',
    isPublic: false,
    category: 'Restaurant',
    area: { ja: '沖縄県沖縄市', en: 'Okinawa City, Okinawa' },
    copy: {
      ja: { category: '和牛サンドイッチ・開業準備中', description: '沖縄市中央で和牛サンドイッチ店を準備中です。商品、開業日、営業時間は確定後にお知らせします。', highlights: [] },
      en: { category: 'Wagyu sandwiches · Preparing to open', description: 'A wagyu sandwich shop is preparing to open in Chuo, Okinawa City. Products, opening date and hours will be announced when confirmed.', highlights: [] },
    },
    image: '/images/spots/gate2.jpg',
    address: { ja: '〒904-0004 沖縄県沖縄市中央1丁目27-11-3F', en: '3F, 1-27-11 Chuo, Okinawa, Okinawa 904-0004, Japan', streetAddress: '3F, 1-27-11 Chuo', locality: 'Okinawa', postalCode: '904-0004' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E3%80%92904-0004%20%E6%B2%96%E7%B8%84%E7%9C%8C%E6%B2%96%E7%B8%84%E5%B8%82%E4%B8%AD%E5%A4%AE1%E4%B8%81%E7%9B%AE27-11-3F',
  },
  {
    slug: 'el-france',
    name: 'El, france',
    isPublic: true,
    category: 'Restaurant',
    area: { ja: '沖縄県名護市', en: 'Nago, Okinawa' },
    copy: {
      ja: { category: '鉄板焼きステーキ', description: '名護市の鉄板焼きステーキ店です。', highlights: [] },
      en: { category: 'Teppanyaki steak', description: 'A teppanyaki steak restaurant in Nago, Okinawa.', highlights: [] },
    },
    image: '/images/spots/elfrance.png',
  },
]

export const publicStores = stores.filter((store) => store.isPublic !== false)

export function getStore(slug: string) {
  return publicStores.find((store) => store.slug === slug)
}

export function storePath(slug: string, locale: Locale) {
  return `${locale === 'en' ? '/en' : ''}/shops/${slug}`
}

export function storeCardAddress(store: Store | undefined) {
  if (!store) return ''
  return store.address?.ja ?? '住所は開業時にご案内'
}
