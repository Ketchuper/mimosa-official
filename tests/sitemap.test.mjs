import test from 'node:test'
import assert from 'node:assert/strict'
import { publicStores, storePath } from '../lib/stores.ts'
import { buildSitemapEntries } from '../lib/sitemap-data.mjs'

test('the sitemap includes news and both locales for public stores only', () => {
  const entries = buildSitemapEntries({
    siteUrl: 'https://www.m-i-m-o-s-a.com',
    stores: publicStores,
    pathForStore: storePath,
  })
  const urls = entries.map(({ url }) => url)

  assert.ok(urls.includes('https://www.m-i-m-o-s-a.com/news'))
  assert.ok(urls.includes('https://www.m-i-m-o-s-a.com/shops/bar-replica'))
  assert.ok(urls.includes('https://www.m-i-m-o-s-a.com/en/shops/el-france'))
  assert.ok(!urls.some((url) => url.includes('/shops/bar-chura-kin')))
})

test('every sitemap URL has its content update date', () => {
  const siteUrl = 'https://www.m-i-m-o-s-a.com'
  const entries = buildSitemapEntries({
    siteUrl,
    stores: publicStores,
    pathForStore: storePath,
  })

  assert.deepEqual(
    Object.fromEntries(entries.map(({ url, lastModified }) => [url, lastModified])),
    {
      [siteUrl]: '2026-10-10',
      [`${siteUrl}/news`]: '2026-10-06',
      [`${siteUrl}/shops/bar-replica`]: '2026-10-15',
      [`${siteUrl}/en/shops/bar-replica`]: '2026-10-15',
      [`${siteUrl}/shops/el-france`]: '2026-10-15',
      [`${siteUrl}/en/shops/el-france`]: '2026-10-15',
    },
  )
})
