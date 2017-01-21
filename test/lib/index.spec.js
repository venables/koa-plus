'use strict'

const KoaPlus = require('../../lib')
const expect = require('chai').expect
const request = require('supertest')

describe('koa-plus', function () {
  let app

  beforeEach(function () {
    app = new KoaPlus()
  })

  it('adds all documented middleware by default', function () {
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
})
