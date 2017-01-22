'use strict'

const body = require('koa-better-body')
const compress = require('koa-compress')
const conditional = require('koa-conditional-get')
const convert = require('koa-convert')
const cors = require('kcors')
const etag = require('koa-etag')
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
    this.use(compress(options.compress))
    this.use(convert(body(options.body)))
    this.use(conditional())
    this.use(etag())
  }
}

module.exports = KoaPlus
