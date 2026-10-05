import test from 'node:test'
import assert from 'node:assert/strict'
import { stores, getStore, storeCardAddress, storePath } from '../lib/stores.ts'

test('the public inventory contains exactly the six confirmed stores', () => {
  assert.deepEqual(stores.map((store) => store.slug), [
    'bar-chura-kin',
    'bar-replica',
    'tontonton',
    'mimosa-koza',
    'mimosa-gate2',
    'heavens-wagyu-sandwich-gate2',
  ])
  assert.deepEqual(stores.map((store) => store.status), [
    'open', 'open', 'open', 'open', 'preopening', 'preopening',
  ])
  assert.equal(getStore('bar-chura-kin')?.name, 'Bar CHURA Kin')
  assert.equal(getStore('bar-replica')?.name, 'Bar REPLICA')
  assert.ok(stores.every((store) => store.name !== 'El, france'))
})

test('every live store has a useful action without inventing facts for unopened stores', () => {
  for (const store of stores) {
    assert.ok(store.copy.ja.description)
    assert.ok(store.copy.en.description)
    if (store.status === 'open') assert.ok(store.mapUrl || store.contactUrl)
    if (store.status === 'preopening') {
      assert.equal(store.hours, undefined)
      assert.equal(store.phone, undefined)
      assert.equal(store.mapUrl, undefined)
    }
  }
  assert.equal(getStore('tontonton')?.hours, undefined)
})

test('store paths are stable and locale-specific', () => {
  assert.equal(storePath('bar-replica', 'ja'), '/shops/bar-replica')
  assert.equal(storePath('bar-replica', 'en'), '/en/shops/bar-replica')
  assert.equal(getStore('not-a-store'), undefined)
})

test('shop cards show a verified address or a truthful pre-opening notice', () => {
  assert.equal(
    storeCardAddress(getStore('mimosa-koza')),
    '〒904-0032 沖縄県沖縄市諸見里1丁目25-8 ハピネスプラザビル702',
  )
  assert.equal(storeCardAddress(getStore('mimosa-gate2')), '住所は開業時にご案内')
})
