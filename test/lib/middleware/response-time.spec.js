'use strict'

const Koa = require('koa')
const middleware = require('../../../lib/middleware/response-time')
const request = require('supertest')

describe('response-time middleware', function () {
  it('adds the `x-response-time` header to the response', function () {
    let app = new Koa()
    app.use(middleware)

    return request(app.listen())
      .get('/')
      .expect('x-response-time', /^[0-9]+ms$/)
  })
})
