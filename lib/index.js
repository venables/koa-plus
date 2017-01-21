'use strict'

const Koa = require('koa')
const middleware = require('./middleware')

class KoaPlus extends Koa {

  constructor () {
    super()

    this.use(middleware.responseTime)
  }
}

module.exports = KoaPlus
