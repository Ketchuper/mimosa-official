export type NewsTag = 'EVENT' | 'RELEASE' | 'VIDEO'

export type NewsItem = {
  id: number
  date: string
  tag: NewsTag
  title: string
  url: string
}

export const newsData: NewsItem[] = [
  {
    id: 8,
    date: '2026.09.23',
    tag: 'RELEASE',
    title: 'Da-win 「Superman (feat. Tough Saki)」サブスク配信開始',
    url: 'https://linkco.re/c9EPa4Yp?lang=ja',
  },
  {
    id: 9,
    date: '2026.08.30',
    tag: 'RELEASE',
    title: 'Da-win 「遠回り (feat. 知葉瑠 & DJ Fourd Nkay)」サブスク配信開始',
    url: 'https://linkco.re/TGtN4VBH?lang=ja',
  },
  {
    id: 10,
    date: '2026.08.16',
    tag: 'RELEASE',
    title: 'Da-win 「18」サブスク配信開始',
    url: 'https://linkco.re/vYUa81Qm?lang=ja',
  },
  {
    id: 1,
    date: '2026.04.05',
    tag: 'EVENT',
    title: 'MIMO$A KOZA 「R&B NIGHT」開催',
    url: 'https://www.instagram.com/p/DWQ0I4DEqYZ/?hl=ja&img_index=1',
  },
  {
    id: 3,
    date: '2026.02.06',
    tag: 'EVENT',
    title: 'ドキュメンタリー映画「ReSTART」コラボドリンク販売開始',
    url: 'https://www.instagram.com/reel/DUabKs3E0d2/?igsh=NXhtdGx2bzEya3My',
  },
  {
    id: 4,
    date: '2026.02.02',
    tag: 'EVENT',
    title: '沖縄アリーナ「VIBE NATION 2026」出演決定',
    url: 'https://www.instagram.com/reel/DUQDGuOkn7W/?igsh=MXRvMDRyMjJiaGVmdQ==',
  },
  {
    id: 7,
    date: '2026.01.20',
    tag: 'RELEASE',
    title: 'Da-win 「Fly」サブスク配信開始',
    url: 'https://linkco.re/Gc4NavTt?lang=ja',
  },
  {
    id: 11,
    date: '2025.10.22',
    tag: 'RELEASE',
    title: 'Da-win 「Turning point」サブスク配信開始',
    url: 'https://linkco.re/QFZ0YZdE?lang=ja',
  },
  {
    id: 12,
    date: '2025.09.24',
    tag: 'RELEASE',
    title: 'Da-win 「Battlecry」配信開始',
    url: 'https://linkco.re/Dq7HpDYr?lang=ja',
  },
  {
    id: 13,
    date: '2025.09.06',
    tag: 'RELEASE',
    title: 'Da-win 「OLD IS NEW (feat. DJ Fourd Nkay)」サブスク配信開始',
    url: 'https://linkco.re/HSg6H3cq?lang=ja',
  },
]

export const HOMEPAGE_NEWS_LIMIT = 5
export const homepageNews = newsData.slice(0, HOMEPAGE_NEWS_LIMIT)
