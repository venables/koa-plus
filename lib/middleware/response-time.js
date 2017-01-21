'use strict'

/**
 * Add an `X-Response-Time` header field to each response
 *
 * @example
 *   ctx.headers
 *   // { `x-response-time': '2ms' }
 *
 * @returns {Promise}
 */
function responseTime (ctx, next) {
  let startTime = Date.now()

  return next().then(() => {
    let total = Math.ceil(Date.now() - startTime)
    ctx.set('X-Response-Time', `${total}ms`)
  })
}

module.exports = responseTime
