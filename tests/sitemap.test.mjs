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
