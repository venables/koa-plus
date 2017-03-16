'use strict'

const body = require('koa-body')
const compress = require('koa-compress')
const conditional = require('koa-conditional-get')
const convert = require('koa-convert')
const cors = require('kcors')
const defaultsDeep = require('lodash.defaultsdeep')
const etag = require('koa-etag')
const helmet = require('koa-helmet')
const json = require('koa-json')
const Koa = require('koa')
const logger = require('koa-morgan')
const middleware = require('./middleware')
const responseTime = require('koa-response-time')

class KoaPlus extends Koa {
  constructor (options) {
    super()

    options = _defaults(options)

    if (_isEnabled(options.responseTime)) {
      this.use(responseTime())
    }

    if (_isEnabled(options.logger)) {
      this.use(logger(options.logger.format, options.logger))
    }

    if (_isEnabled(options.requestId)) {
      this.use(middleware.requestId)
    }

    if (_isEnabled(options.helmet)) {
      this.use(helmet(options.helmet))
    }

    if (_isEnabled(options.cors)) {
      this.use(cors(options.cors))
    }

    if (_isEnabled(options.compress)) {
      this.use(compress(options.compress))
    }

    if (_isEnabled(options.etag)) {
      this.use(conditional())
      this.use(etag())
    }

    if (_isEnabled(options.body)) {
      this.use(convert(body(options.body)))
    }

    if (_isEnabled(options.json)) {
      this.use(json(options.json))
    }

    if (_isEnabled(options.debug)) {
      this.use(middleware.debug(options.debug && options.debug.name))
    }

    this.context.config = options
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
    },
    logger: {
      enabled: process.env.NODE_ENV !== 'test',
      format: process.env.NODE_ENV === 'development' ? 'dev' : 'common'
    }
  })
}

function _isEnabled (middleware) {
  if (middleware && middleware.enabled === false) {
    return false
  }

  return true
}

module.exports = KoaPlus
