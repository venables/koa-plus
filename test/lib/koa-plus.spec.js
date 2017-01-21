'use strict'

const KoaPlus = require('../../lib')
const request = require('supertest')
const uuid = require('uuid-regexp')

describe('koa-plus', function () {
  let origin = 'http://test.host'

  it('adds all documented middleware by default', function () {
    let app = new KoaPlus()

    return request(app.listen())
      .get('/')
      .set('Origin', origin)
      .expect('x-response-time', /^[0-9]+ms$/)
      .expect('x-request-id', uuid())
      .expect('x-dns-prefetch-control', 'off')
      .expect('x-frame-options', 'SAMEORIGIN')
      .expect('x-download-options', 'noopen')
      .expect('x-content-type-options', 'nosniff')
      .expect('x-xss-protection', '1; mode=block')
      .expect('access-control-allow-origin', origin)
  })

  it('allows configuration of the middleware', function () {
    let app = new KoaPlus({
      helmet: {
        noCache: true
      },
      cors: {
        origin: '*'
      }
    })

    return request(app.listen())
      .get('/')
      .set('Origin', origin)
      .expect('surrogate-control', 'no-store')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('Access-Control-Allow-Origin', '*')
  })
})
