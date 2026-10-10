import test from 'node:test'
import assert from 'node:assert/strict'
import { stores, publicStores, getStore, storePath } from '../lib/stores.ts'

test('the public inventory shows only Bar REPLICA and El, france', () => {
  assert.deepEqual(publicStores.map((store) => store.slug), [
    'bar-replica',
    'el-france',
  ])
  for (const slug of ['bar-chura-kin', 'tontonton', 'mimosa-koza', 'mimosa-gate2', 'heavens-wagyu-sandwich-gate2']) {
    assert.equal(stores.find((store) => store.slug === slug)?.isPublic, false)
    assert.equal(getStore(slug), undefined)
  }
  assert.equal(stores.find((store) => store.slug === 'tontonton')?.isPublic, false)
  assert.equal(getStore('bar-replica')?.name, 'Bar REPLICA')
  assert.equal(getStore('el-france')?.status, undefined)
  assert.equal(stores.find((store) => store.slug === 'bar-chura-kin')?.name, 'Bar CHURA Kin')
  assert.equal(stores.find((store) => store.slug === 'bar-replica')?.name, 'Bar REPLICA')
  const elFrance = stores.find((store) => store.slug === 'el-france')
  assert.equal(elFrance?.name, 'El, france')
  assert.equal(elFrance?.status, undefined)
  assert.doesNotMatch(`${elFrance?.copy.ja.category} ${elFrance?.copy.ja.description} ${elFrance?.copy.en.category} ${elFrance?.copy.en.description}`, /閉店|閉業|Closed|formerly|no longer open/i)
  assert.ok(elFrance?.address)
  assert.equal(elFrance?.hours, undefined)
  assert.ok(elFrance?.mapUrl)
})

test('public store area labels use only formal prefecture and city names', () => {
  assert.equal(stores.find((store) => store.slug === 'mimosa-koza')?.area.ja, '沖縄県沖縄市')
  assert.equal(stores.find((store) => store.slug === 'mimosa-gate2')?.area.ja, '沖縄県沖縄市')
  assert.equal(stores.find((store) => store.slug === 'heavens-wagyu-sandwich-gate2')?.area.ja, '沖縄県沖縄市')
  assert.equal(stores.find((store) => store.slug === 'bar-replica')?.area.ja, '沖縄県名護市')
})

test('public store pages explain their status without inventing facts', () => {
  for (const store of publicStores) {
    assert.ok(store.copy.ja.description)
    assert.ok(store.copy.en.description)
    if (store.status === 'open') assert.ok(store.mapUrl || store.contactUrl)
    if (store.status === 'preopening') {
      assert.equal(store.hours, undefined)
      assert.equal(store.phone, undefined)
    }
  }
})

test('store paths are stable and locale-specific', () => {
  assert.equal(storePath('bar-replica', 'ja'), '/shops/bar-replica')
  assert.equal(storePath('bar-replica', 'en'), '/en/shops/bar-replica')
  assert.equal(getStore('not-a-store'), undefined)
})

test('store cards use area labels while detail pages retain full addresses', () => {
  for (const store of publicStores) {
    assert.ok(store.address?.ja.includes(store.area.ja))
  }
  assert.equal(stores.find((store) => store.slug === 'bar-replica')?.area.ja, '沖縄県名護市')
  assert.equal(stores.find((store) => store.slug === 'el-france')?.area.ja, '沖縄県名護市')
})

test('El, france has the supplied Nago address and a matching Google Maps search link', () => {
  const elFrance = stores.find((store) => store.slug === 'el-france')
  assert.deepEqual(elFrance?.address, {
    ja: '〒905-0016 沖縄県名護市大東1丁目7-14',
    en: '1-7-14 Daito, Nago, Okinawa 905-0016, Japan',
    streetAddress: '1-7-14 Daito',
    locality: 'Nago',
    postalCode: '905-0016',
  })
  assert.equal(new URL(elFrance?.mapUrl ?? '').searchParams.get('query'), '〒905-0016 沖縄県名護市大東1丁目7-14')
  assert.equal(elFrance?.status, undefined)
})

test('requested CHURA and wagyu sandwich photos are assigned to their shops', () => {
  assert.equal(stores.find((store) => store.slug === 'bar-chura-kin')?.image, '/images/spots/churakin.png')
  assert.equal(stores.find((store) => store.slug === 'mimosa-gate2')?.image, '/images/spots/gate2.jpg')
  assert.equal(stores.find((store) => store.slug === 'heavens-wagyu-sandwich-gate2')?.image, '/images/spots/gate2.jpg')
})
