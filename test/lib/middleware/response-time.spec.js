'use strict'

const Koa = require('koa')
const expect = require('chai').expect
const middleware = require('../../../lib/middleware/response-time')
const request = require('supertest')

describe('response-time middleware', function () {
  let app

  beforeEach(function () {
    app = new Koa()
  })

  it('adds the `x-response-time` header to the response', function () {
    app.use(middleware)

    return request(app.listen())
      .get('/')
      .then(function (res) {
        expect(res.headers).to.include.key('x-response-time')
      })
  })
})
