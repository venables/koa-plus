# koa-plus

The [Koa framework](https://github.com/koajs/koa) (v2) extended for APIs. Optimized for security, scalability, and productivity.

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
