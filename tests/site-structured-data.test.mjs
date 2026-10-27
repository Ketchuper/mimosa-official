import test from 'node:test'
import assert from 'node:assert/strict'
import { homepageJsonLd, newsPageJsonLd } from '../lib/site-structured-data.ts'

const siteUrl = 'https://www.m-i-m-o-s-a.com'

test('homepage schema describes the visible organization and site', () => {
  const data = homepageJsonLd(siteUrl)
  const entities = data['@graph']

  assert.deepEqual(entities.map(({ '@type': type }) => type), ['Organization', 'WebSite'])
  assert.equal(entities[0].name, 'MIMO$A')
  assert.equal(entities[0].address.postalCode, '904-0032')
  assert.equal(entities[1].publisher['@id'], entities[0]['@id'])
  assert.deepEqual(entities[1].inLanguage, ['ja', 'en'])
  assert.equal(entities[0].offers, undefined)
})

test('news archive is identified as a Japanese collection page', () => {
  const data = newsPageJsonLd(siteUrl)

  assert.equal(data['@type'], 'CollectionPage')
  assert.equal(data.url, 'https://www.m-i-m-o-s-a.com/news')
  assert.equal(data.inLanguage, 'ja')
  assert.equal(data.isPartOf['@id'], 'https://www.m-i-m-o-s-a.com/#website')
})
