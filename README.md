# koa-plus

[![Version](https://img.shields.io/npm/v/koa-plus.svg?style=flat-square)](https://www.npmjs.com/package/koa-plus)
[![Build Status](https://img.shields.io/travis/venables/koa-plus/master.svg?style=flat-square)](https://travis-ci.org/venables/koa-plus)
[![Coverage Status](https://img.shields.io/coveralls/venables/koa-plus.svg?style=flat-square)](https://coveralls.io/github/venables/koa-plus)
[![Dependency Status](https://img.shields.io/david/venables/koa-plus.svg?style=flat-square)](https://david-dm.org/venables/koa-plus)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![Downloads](https://img.shields.io/npm/dm/koa-plus.svg?style=flat-square)](https://www.npmjs.com/package/koa-plus)

koa-plus is the [koa framework](https://github.com/koajs/koa) (v2) extended for APIs. Optimized for security, scalability, and productivity.

## Features

* Important security headers via [helmet](https://github.com/venables/koa-helmet).
* CORS support via [kcors](https://github.com/koajs/cors/tree/v2.x).
* Adds an [X-Response-Time](https://github.com/koajs/response-time/tree/v2.x) header to all responses.
* Adds an [X-Request-Id](lib/middleware/request-id.js) header to all requests as they come in for easier debugging.
  * Also passes through client/proxy/load-balancer generated `X-Request-Id` headers as `X-Client-Request-Id`
* Uses [koa-better-body](https://github.com/tunnckoCore/koa-better-body) to parse any request body type
* Adds ETag headers to allow conditional GET requests (respond with `304 Not Modified`)
* Object stream support via [koa-json](https://github.com/koajs/json)
* Request logging via [koa-morgan](https://github.com/koa-modules/morgan)
* Simple `ctx.debug` (or `ctx.app.debug`) logging via the [debug](https://github.com/visionmedia/debug) module
* Pretty-printed JSON in development
* Exposes the app configuration on ctx as `ctx.config` (or, app.context.config)

Each feature [can be disabled](#disabling-middleware) individually.

## Installation

Install `koa-plus` via yarn or npm:

```
yarn add koa-plus
```

```
npm install koa-plus --save
```

## Usage

### Existing apps:

Simply replace your existing `koa` require with `koa-plus`

Old:

```js
const Koa = require('koa')
const app = new Koa()
// ...
```

New:

```js
const Koa = require('koa-plus')
const app = new Koa()
// ...
```

### Configuration

Some of the middleware included in `koa-plus` allows for options.  To pass options to these
middleware, simply pass the options to the constructor.

#### Options

* `body`:  Use the same options as the `koa-better-body` middleware accepts. [Docs](https://github.com/tunnckoCore/koa-better-body)
* `compress`: Use the same options as the `koa-compress` middleware accepts. [Docs](https://github.com/koajs/compress/tree/v2.x)
* `cors`: Use the same options as the `kcors` middleware accepts. [Docs](https://github.com/koajs/cors/tree/v2.x)
* `debug`: Set the `name` of the debug logger
* `helmet`: Use the same options as the `helmet` middleware accepts. [Docs](https://helmetjs.github.io/docs/)
* `json`: Use the same options as the `koa-json` middleware accepts. [Docs](https://github.com/koajs/json/tree/next)
* `logger`: Use `format` for the logger format, and the remaining options as what `morgan` accepts [Docs](https://github.com/expressjs/morgan)

#### Example

```js
const Koa = require('koa-plus')

const app = new Koa({
  body: {
    jsonLimit: '10kb' // Sets the json request body limit to 10k
  },
  compress: {
    threshold: 2048 // Sets the threshold to Gzip responses at 2k (2048 bytes)
  },
  cors: {
    origin: '*' // Set the `Access-Control-Allow-Origin` header to be `*`
  },
  debug: {
    name: 'worker' // Set the debug logger name
  },
  helmet: {
    noCache: true,  // Sets the `Cache-Control` headers to prevent caching
    frameguard: {
      action: 'deny' // Set the `X-Frame-Options' header to be `DENY`
    }
  },
  json: {
    pretty: false // Disables pretty-printing
  },
  logger: {
    format: 'dev' // Use the `dev` format of logging
  }
})
```

#### Disabling middleware

Each of the middleware in koa-plus can be disabled individually by using the `enabled` option.

As an example, to reset `koa-plus` back to basic `koa` functionality, use the following config:

```js
const Koa = require('koa-plus')

const app = new Koa({
  body: {
    enabled: false
  },
  compress: {
    enabled: false
  },
  cors: {
    enabled: false
  },
  debug: {
    enabled: false
  },
  etag: {
    enabled: false
  },
  helmet: {
    enabled: false
  },
  json: {
    enabled: false
  },
  logger: {
    enabled: false
  },
  requestId: {
    enabled: false
  },
  responseTime: {
    enabled: false
  }
})
```

## Testing

To run the tests locally, simply run

```
yarn test
```

or

```
npm test
```
