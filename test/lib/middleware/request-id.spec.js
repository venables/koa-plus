'use strict'

const Koa = require('koa')
const middleware = require('../../../lib/middleware/request-id')
const request = require('supertest')
const uuid = require('uuid-regexp')

describe('request-id middleware', function () {
  it('adds the `x-request-id` header to the response', function () {
    let app = new Koa()
    app.use(middleware)

    return request(app.listen())
      .get('/')
      .expect('x-request-id', uuid())
  })
})
