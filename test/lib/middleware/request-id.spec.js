'use strict'

const Koa = require('koa')
const middleware = require('../../../lib/middleware/request-id')
const request = require('supertest')
const uuid = require('../../support/uuid')

describe('request-id middleware', function () {
  it('adds the `X-Request-Id` header to the response', function () {
    let app = new Koa()
    app.use(middleware)

    return request(app.listen())
      .get('/')
      .expect('X-Request-Id', uuid.regexp)
  })

  it('adds the `X-Client-Request-Id` header to the response if provided by the client', function () {
    let clientId = 'THE_CLIENT_ID'
    let app = new Koa()
    app.use(middleware)

    return request(app.listen())
      .get('/')
      .set('X-Request-Id', clientId)
      .expect('X-Request-Id', uuid.regexp)
      .expect('X-Client-Request-Id', clientId)
  })
})
