import test from 'node:test'
import assert from 'node:assert/strict'
import { stores, publicStores, getStore, storeCardAddress, storePath } from '../lib/stores.ts'

test('the public inventory excludes stores temporarily hidden from the site', () => {
  assert.deepEqual(publicStores.map((store) => store.slug), [
    'bar-chura-kin',
    'mimosa-koza',
    'mimosa-gate2',
    'heavens-wagyu-sandwich-gate2',
  ])
  assert.equal(stores.find((store) => store.slug === 'tontonton')?.isPublic, false)
  assert.equal(stores.find((store) => store.slug === 'bar-replica')?.isPublic, false)
  assert.equal(stores.find((store) => store.slug === 'el-france')?.isPublic, false)
  assert.equal(getStore('tontonton'), undefined)
  assert.equal(getStore('bar-replica'), undefined)
  assert.equal(getStore('el-france'), undefined)
  assert.equal(getStore('bar-chura-kin')?.name, 'Bar CHURA Kin')
  assert.equal(stores.find((store) => store.slug === 'bar-replica')?.name, 'Bar REPLICA')
  const elFrance = stores.find((store) => store.slug === 'el-france')
  assert.equal(elFrance?.name, 'El, france')
  assert.equal(elFrance?.status, 'closed')
  assert.equal(elFrance?.address, undefined)
  assert.equal(elFrance?.hours, undefined)
  assert.equal(elFrance?.mapUrl, undefined)
})

test('public store area labels use only formal prefecture and city names', () => {
  assert.equal(getStore('mimosa-koza')?.area.ja, '沖縄県沖縄市')
  assert.equal(getStore('mimosa-gate2')?.area.ja, '沖縄県沖縄市')
  assert.equal(getStore('heavens-wagyu-sandwich-gate2')?.area.ja, '沖縄県沖縄市')
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

test('shop cards show verified addresses for every confirmed location', () => {
  assert.equal(
    storeCardAddress(getStore('mimosa-koza')),
    '〒904-0032 沖縄県沖縄市諸見里1丁目25-8 ハピネスプラザビル702',
  )
  const gate2Address = '〒904-0004 沖縄県沖縄市中央1丁目27-11-3F'
  assert.equal(storeCardAddress(getStore('mimosa-gate2')), gate2Address)
  assert.equal(storeCardAddress(getStore('heavens-wagyu-sandwich-gate2')), gate2Address)
})

test('requested CHURA and wagyu sandwich photos are assigned to their shops', () => {
  assert.equal(getStore('bar-chura-kin')?.image, '/images/spots/churakin.png')
  assert.equal(getStore('mimosa-gate2')?.image, '/images/spots/gate2.jpg')
  assert.equal(getStore('heavens-wagyu-sandwich-gate2')?.image, '/images/spots/gate2.jpg')
})
