'use strict'

const debug = require('debug')

/**
 * Exposes a `debug` method on `ctx.app.debug` and `ctx.debug` for easy debugging
 */
function middleware (name) {
  name = name || 'app'

  return function debugMiddleware (ctx, next) {
    let debugLog = debug(name)

    ctx.app.debug = debugLog
    ctx.debug = debugLog

    return next()
  }
}

module.exports = middleware
