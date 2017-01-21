# koa-plus

The [Koa framework](https://github.com/koajs/koa) (v2) extended for APIs. Optimized for security, scalability, and productivity.

## Features

* Adds an [X-Response-Time](lib/middleware/response-time.js) header to all responses.
* Adds an [X-Request-Id](lib/middleware/request-id.js) header to all requests as they come in for easier debugging.
* Adds important security headers via [helmet](https://github.com/venables/koa-helmet)

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

```
const Koa = require('koa')
const app = new Koa()
// ...
```

New:

```
const Koa = require('koa-plus')
const app = new Koa()
// ...
```

## Testing

To run the tests locally, simply run `npm test`:

```
npm test
```
