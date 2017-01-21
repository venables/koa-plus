'use strict'

module.exports = (ctx, next) => {
  ctx.body = { hello: 'world' }
  ctx.status = 200
}
