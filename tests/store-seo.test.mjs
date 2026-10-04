import test from 'node:test'
import assert from 'node:assert/strict'
import { stores } from '../lib/stores.ts'
import { localBusinessJsonLd, storeMetadata } from '../lib/store-seo.ts'

test('open stores with a verified street address receive localized LocalBusiness data', () => {
  const replica = stores.find((store) => store.slug === 'bar-replica')
  const data = localBusinessJsonLd(replica, 'en')
  assert.equal(data['@type'], 'BarOrPub')
  assert.equal(data.name, 'Bar REPLICA')
  assert.equal(data.address['@type'], 'PostalAddress')
  assert.equal(data.address.postalCode, '905-0013')
  assert.equal(data.openingHoursSpecification, undefined)
})

test('localized pages identify the same business and only link matching profiles', () => {
  const store = stores.find(({ slug }) => slug === 'bar-chura-kin')
  const ja = localBusinessJsonLd(store, 'ja')
  const en = localBusinessJsonLd(store, 'en')
  assert.equal(ja['@id'], en['@id'])
  assert.deepEqual(ja.sameAs, [store.contactUrl])
})

test('preopening stores do not claim an open street business', () => {
  const gate2 = stores.find((store) => store.slug === 'mimosa-gate2')
  const koza = stores.find((store) => store.slug === 'mimosa-koza')
  assert.equal(localBusinessJsonLd(gate2, 'ja'), undefined)
  assert.equal(localBusinessJsonLd(koza, 'ja').address.postalCode, '904-0032')
})

test('metadata identifies each language and gives unopened stores truthful titles', () => {
  const gate2 = stores.find((store) => store.slug === 'mimosa-gate2')
  const metadata = storeMetadata(gate2, 'en')
  assert.match(metadata.title, /Preparing to open/)
  assert.equal(metadata.alternates.canonical, '/en/shops/mimosa-gate2')
  assert.equal(metadata.alternates.languages.ja, '/shops/mimosa-gate2')
})
