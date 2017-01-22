'use strict'

const controller = require('../support/controller')
const etag = require('etag')
const KoaPlus = require('../../lib')
const request = require('supertest')
const uuid = require('uuid-regexp')

describe('koa-plus', function () {
  let origin = 'http://test.host'

  it('adds all documented middleware by default', function () {
    let app = new KoaPlus()
    app.use(controller)

    return request(app.listen())
      .get('/')
      .set('Origin', origin)
      .expect('X-Response-Time', /^[0-9]+ms$/)
      .expect('X-Request-ID', uuid())
      .expect('X-Dns-Prefetch-Control', 'off')
      .expect('X-Frame-Options', 'SAMEORIGIN')
      .expect('X-Download-Options', 'noopen')
      .expect('X-Content-Type-Options', 'nosniff')
      .expect('X-XSS-Protection', '1; mode=block')
      .expect('Access-Control-Allow-Origin', origin)
      .expect('Vary', 'Accept-Encoding')
      .expect('ETag', /.*/)
      .expect(200)
  })

  it('allows configuration of the middleware', function () {
    let app = new KoaPlus({
      helmet: {
        noCache: true
      },
      cors: {
        origin: '*'
      },
      compress: {
        threshold: 1
      }
    })
    app.use(controller)

    return request(app.listen())
      .get('/')
      .set('Origin', origin)
      .expect('Surrogate-Control', 'no-store')
      .expect('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('Pragma', 'no-cache')
      .expect('Expires', '0')
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Content-Encoding', 'gzip')
      .expect('Transfer-Encoding', 'chunked')
      .expect(200)
  })

  it('parses JSON bodies', function () {
    let app = new KoaPlus()
    app.use(controller)

    return request(app.listen())
      .post('/')
      .send({ super: 'test' })
      .expect(201)
      .expect({ fields: { super: 'test' } })
  })

  it('responds with a `304 Not Modified` if a fresh cache exists', function () {
    let body = { hello: 'world' }
    let app = new KoaPlus()
    app.use((ctx) => {
      ctx.body = body
    })

    return request(app.listen())
      .get('/')
      .set('If-None-Match', etag(JSON.stringify(body)))
      .expect(304)
  })
})
