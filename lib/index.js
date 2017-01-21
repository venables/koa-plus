'use strict'

const cors = require('kcors')
const helmet = require('koa-helmet')
const Koa = require('koa')
const middleware = require('./middleware')

class KoaPlus extends Koa {

  constructor (options) {
    super()

    options = options || {}

    this.use(middleware.responseTime)
    this.use(middleware.requestId)
    this.use(helmet(options.helmet))
    this.use(cors(options.cors))
  }
}

module.exports = KoaPlus
