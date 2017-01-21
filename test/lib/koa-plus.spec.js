'use strict'

const KoaPlus = require('../../lib')
const request = require('supertest')
const uuid = require('uuid-regexp')

describe('koa-plus', function () {
  it('adds all documented middleware by default', function () {
    let app = new KoaPlus()

    return request(app.listen())
      .get('/')
      .expect('x-response-time', /^[0-9]+ms$/)
      .expect('x-request-id', uuid())
      .expect('x-dns-prefetch-control', 'off')
      .expect('x-frame-options', 'SAMEORIGIN')
      .expect('x-download-options', 'noopen')
      .expect('x-content-type-options', 'nosniff')
      .expect('x-xss-protection', '1; mode=block')
  })

  it('allows configuration of the middleware', function () {
    let app = new KoaPlus({
      helmet: {
        noCache: true
      }
    })

    return request(app.listen())
      .get('/')
      .expect('surrogate-control', 'no-store')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
  })
})
