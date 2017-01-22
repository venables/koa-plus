'use strict'

const body = require('koa-better-body')
const compress = require('koa-compress')
const conditional = require('koa-conditional-get')
const convert = require('koa-convert')
const cors = require('kcors')
const defaultsDeep = require('lodash.defaultsdeep')
const etag = require('koa-etag')
const helmet = require('koa-helmet')
const json = require('koa-json')
const Koa = require('koa')
const middleware = require('./middleware')
const responseTime = require('koa-response-time')

class KoaPlus extends Koa {
  constructor (options) {
    super()

    options = _defaults(options)

    this.use(responseTime())
    this.use(middleware.requestId)
    this.use(helmet(options.helmet))
    this.use(cors(options.cors))
    this.use(compress(options.compress))
    this.use(convert(body(options.body)))
    this.use(json(options.json))
    this.use(conditional())
    this.use(etag())
  }
}

/**
 * Set default values for the `options` param if not set
 *
 * @param {Object} [options] - The options to use (optional)
 * @returns {Object} - The options object with default values
 */
function _defaults (options) {
  return defaultsDeep(options, {
    json: {
      pretty: process.env.NODE_ENV === 'development'
    }
  })
}

module.exports = KoaPlus
