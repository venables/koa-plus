'use strict'

const KoaPlus = require('../../lib')
const expect = require('chai').expect
const request = require('supertest')

describe('koa-plus', function () {
  it('adds all documented middleware by default', function () {
    let app = new KoaPlus()

    return request(app.listen())
      .get('/')
      .then(function (res) {
        // response-time middleware
        expect(res.headers).to.include.key('x-response-time')

        // request-id middleware
        expect(res.headers).to.include.key('x-request-id')

        // koa-helmet
        expect(res.headers).to.include.key('x-dns-prefetch-control')
        expect(res.headers).to.include.key('x-frame-options')
        expect(res.headers).to.include.key('x-download-options')
        expect(res.headers).to.include.key('x-content-type-options')
        expect(res.headers).to.include.key('x-xss-protection')
        expect(res.headers['x-dns-prefetch-control']).to.equal('off')
        expect(res.headers['x-frame-options']).to.equal('SAMEORIGIN')
        expect(res.headers['x-download-options']).to.equal('noopen')
        expect(res.headers['x-content-type-options']).to.equal('nosniff')
        expect(res.headers['x-xss-protection']).to.equal('1; mode=block')
      })
  })

  it('allows configuration of the middleware', function () {
    let app = new KoaPlus({
      helmet: {
        noCache: true
      }
    })

    return request(app.listen())
      .get('/')
      .then(function (res) {
        expect(res.headers['surrogate-control']).to.equal('no-store')
        expect(res.headers['cache-control']).to.equal('no-store, no-cache, must-revalidate, proxy-revalidate')
        expect(res.headers['pragma']).to.equal('no-cache')
        expect(res.headers['expires']).to.equal('0')
      })
  })
})
