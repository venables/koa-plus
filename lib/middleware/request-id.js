'use strict'

const uuid = require('uuid')

/**
 * Generates a unique request ID for all requests, setting it as `ctx.state.requestId` and as
 * the `X-Request-Id` header to aid with debugging.
 *
 * If there is an `X-Request-Id` header from client, this will be set as `ctx.state.clientRequestId`
 * and as the header `X-Client-Request-Id`.
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
module.exports = function requestId (ctx, next) {
  let clientId = ctx.get('X-Request-Id')

  if (clientId) {
    ctx.state.clientRequestId = clientId
    ctx.set('X-Client-Request-Id', ctx.state.clientRequestId)
  }

  ctx.state.requestId = uuid.v4()
  ctx.set('X-Request-Id', ctx.state.requestId)
  return next()
}
