'use strict'

const helmet = require('koa-helmet')
const Koa = require('koa')
const middleware = require('./middleware')

class KoaPlus extends Koa {

  constructor (options = {}) {
    super()

    this.use(middleware.responseTime)
    this.use(middleware.requestId)
    this.use(helmet(options.helmet))
  }
}

module.exports = KoaPlus
