'use strict'

const Koa = require('koa')
const KoaPlus = require('../../../lib')
const expect = require('chai').expect
const middleware = require('../../../lib/middleware/response-time')
const request = require('supertest')

describe('response-time middleware', function () {
  it('adds the `x-response-time` header to the response', function () {
    let app = new Koa()
    app.use(middleware)

    return request(app.listen())
      .get('/')
      .then(function (res) {
        expect(res.headers).to.include.key('x-response-time')
      })
  })

  it('is included in KoaPlus by default', function () {
    let app = new KoaPlus()

    return request(app.listen())
      .get('/')
      .then(function (res) {
        expect(res.headers).to.include.key('x-response-time')
      })
  })
})
