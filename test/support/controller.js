'use strict'

module.exports = (ctx, next) => {
  if (ctx.request.body) {
    ctx.body = { body: ctx.request.body }
  } else if (ctx.request.fields) {
    ctx.body = { fields: ctx.request.fields }
  } else {
    ctx.body = { hello: 'world' }
  }

  switch (ctx.method) {
    case 'POST':
      ctx.status = 201
      break
    case 'DELETE':
      ctx.status = 204
      break
    default:
      ctx.status = 200
  }
}
