'use strict'

const uuid = require('uuid')

/**
 * Adds an `X-Request-Id` header to all requests as they come in for easier debugging.
 * Also sets ctx.state.requestId to be used in the request/response lifecycle
 *
 * @example
 *   ctx.headers
 *   // { `x-request-id`: '72243aca-e4bb-4a3a-a2e7-ed380c256826' }
 *
 *   ctx.state
 *   // { requestId: '72243aca-e4bb-4a3a-a2e7-ed380c256826' }
 *
 * @returns {Promise}
 */
module.exports = function (ctx, next) {
  ctx.state.requestId = uuid.v4()
  ctx.set('X-Request-Id', ctx.state.requestId)
  return next()
}
