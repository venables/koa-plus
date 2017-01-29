# Changelog

## master

* Set `ctx.id`, `ctx.request.id`, and `ctx.state.requestId` as requestId

## 1.1.0 (2017-01-22)

* Allow middleware to be disabled with the `enabled: false` flag
* Add request logging via `koa-morgan`

## 1.0.0 (2017-01-21)

First major release :rocket:

`koa-plus` is `koa` with the following middleware by default:
* koa-helmet (security headers)
* kcors (CORS)
* koa-compress (gzip)
* koa-etag (ETag support)
* koa-conditional-get (304 Not Modified support)
* koa-better-body (request body parsing)
* koa-json (object streaming, json printing)

## 0.2.0 (2017-01-21)

Adds support for:
* CORS
* Response Compression (Gzip)
* Body parsing
* ETags with Conditional GETs

## 0.1.0 (2017-01-21)

First release, including security headers via koa-helmet, response timing, and request IDs.
