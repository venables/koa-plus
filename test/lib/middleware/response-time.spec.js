'use strict'

const Koa = require('koa')
const middleware = require('../../../lib/middleware/response-time')
const request = require('supertest')

describe('response-time middleware', function () {
  it('adds the `X-Response-Time` header to the response', function () {
    let app = new Koa()
    app.use(middleware)

    return request(app.listen())
      .get('/')
      .expect('X-Response-Time', /^[0-9]+ms$/)
  })
})
