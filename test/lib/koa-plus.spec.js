'use strict'

const controller = require('../support/controller')
const etag = require('etag')
const KoaPlus = require('../../lib')
const request = require('supertest')
const uuid = require('../support/uuid')

describe('koa-plus', function () {
  let origin = 'http://test.host'

  it('adds all documented middleware by default', function () {
    let app = new KoaPlus()
    app.use(controller)

    return request(app.listen())
      .get('/')
      .set('Origin', origin)
      .expect('X-Response-Time', /^[0-9]+ms$/)
      .expect('X-Request-ID', uuid.regexp)
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
      compress: {
        threshold: 1
      },
      cors: {
        origin: '*'
      },
      helmet: {
        noCache: true
      },
      logger: {
        enabled: true,
        skip: () => true
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

  it('allows for disabling each of the middleware', function () {
    let app = new KoaPlus({
      body: {
        enabled: false
      },
      compress: {
        enabled: false
      },
      cors: {
        enabled: false
      },
      etag: {
        enabled: false
      },
      helmet: {
        enabled: false
      },
      json: {
        enabled: false
      },
      logger: {
        enabled: false
      },
      requestId: {
        enabled: false
      },
      responseTime: {
        enabled: false
      }
    })
    app.use(controller)

    return request(app.listen())
      .post('/')
      .set('Origin', origin)
      .send({ super: 'test' })
      .expect((res) => {
        let headers = Object.keys(res.headers)

        if (_includes(headers, 'x-response-time')) {
          throw new Error('Should not include header: X-Response-Time')
        }

        if (_includes(headers, 'x-request-id')) {
          throw new Error('Should not include header: X-Request-Id')
        }
        if (_includes(headers, 'x-dns-prefetch-control')) {
          throw new Error('Should not include header: X-DNS-Prefetch-Control')
        }
        if (_includes(headers, 'x-frame-options')) {
          throw new Error('Should not include header: X-Frame-Options')
        }
        if (_includes(headers, 'x-download-options')) {
          throw new Error('Should not include header: X-Download-Options')
        }
        if (_includes(headers, 'x-content-type-options')) {
          throw new Error('Should not include header: X-Content-Type-Options')
        }
        if (_includes(headers, 'x-xss-protection')) {
          throw new Error('Should not include header: X-XSS-Protection')
        }
        if (_includes(headers, 'access-control-allow-origin')) {
          throw new Error('Should not include header: Access-Control-Allow-Origin')
        }
        if (_includes(headers, 'vary')) {
          throw new Error('Should not include header: Vary')
        }
        if (_includes(headers, 'etag')) {
          throw new Error('Should not include header: ETag')
        }

        if (res.body && res.body.fields) {
          throw new Error('Should not have a res.body `fields` property')
        }
      })
      .expect(201)
  })
})

function _includes (array, value) {
  return array.indexOf(value) !== -1
}
