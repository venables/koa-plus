# koa-plus

The [Koa framework](https://github.com/koajs/koa) (v2) extended for APIs. Optimized for security, scalability, and productivity.

## Features

* Automatically adds important security headers via [helmet](https://github.com/venables/koa-helmet).
* Adds CORS support via [kcors](https://github.com/koajs/cors/tree/v2.x).
* Adds an [X-Response-Time](lib/middleware/response-time.js) header to all responses.
* Adds an [X-Request-Id](lib/middleware/request-id.js) header to all requests as they come in for easier debugging.

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

* `helmet`: Use the same options as the `helmet` middleware accepts. [Docs](https://helmetjs.github.io/docs/)

#### Example

```js
const Koa = require('koa-plus')

const app = new Koa({
  helmet: {
    noCache: true,  // Sets the `Cache-Control` headers to prevent caching
    frameguard: {
      action: 'deny' // Set the `X-Frame-Options' header to be `DENY`
    }
  }
})
```

## Testing

To run the tests locally, simply run `npm test`:

```
npm test
```
