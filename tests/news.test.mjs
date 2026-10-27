import test from 'node:test'
import assert from 'node:assert/strict'
import { HOMEPAGE_NEWS_LIMIT, homepageNews, newsData } from '../lib/news.ts'

test('Da-win releases use their verified TuneCore dates and release pages', () => {
  const releases = newsData.filter((item) => item.tag === 'RELEASE')

  assert.deepEqual(
    releases.map(({ date, title, url }) => ({ date, title, url })),
    [
      { date: '2026.09.23', title: 'Da-win 「Superman (feat. Tough Saki)」サブスク配信開始', url: 'https://linkco.re/c9EPa4Yp?lang=ja' },
      { date: '2026.08.30', title: 'Da-win 「遠回り (feat. 知葉瑠 & DJ Fourd Nkay)」サブスク配信開始', url: 'https://linkco.re/TGtN4VBH?lang=ja' },
      { date: '2026.08.16', title: 'Da-win 「18」サブスク配信開始', url: 'https://linkco.re/vYUa81Qm?lang=ja' },
      { date: '2026.01.20', title: 'Da-win 「Fly」サブスク配信開始', url: 'https://linkco.re/Gc4NavTt?lang=ja' },
      { date: '2025.10.22', title: 'Da-win 「Turning point」サブスク配信開始', url: 'https://linkco.re/QFZ0YZdE?lang=ja' },
      { date: '2025.09.24', title: 'Da-win 「Battlecry」配信開始', url: 'https://linkco.re/Dq7HpDYr?lang=ja' },
      { date: '2025.09.06', title: 'Da-win 「OLD IS NEW (feat. DJ Fourd Nkay)」サブスク配信開始', url: 'https://linkco.re/HSg6H3cq?lang=ja' },
    ],
  )
})

test('the homepage shows five recent items and keeps the full archive available', () => {
  assert.equal(HOMEPAGE_NEWS_LIMIT, 5)
  assert.equal(homepageNews.length, HOMEPAGE_NEWS_LIMIT)
  assert.deepEqual(homepageNews, newsData.slice(0, HOMEPAGE_NEWS_LIMIT))
  assert.ok(newsData.length > homepageNews.length)
})
