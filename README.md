# Node.js Client for Yelp Fusion Services

[![npm](https://img.shields.io/npm/v/@kob490/yelp-fusion-plus.svg)](https://www.npmjs.com/package/@kob490/yelp-fusion-plus)
![CI](https://github.com/kob490/yelp-fusion-plus/actions/workflows/on-main-update.yml/badge.svg)
![Release](https://github.com/kob490/yelp-fusion-plus/workflows/Release/badge.svg)

<!-- ![GitHub contributors](https://img.shields.io/github/contributors/kob490/yelp-fusion-plus?color=green) -->

Use Node.js? Want to find businesses & reviews on yelp? This library brings the [Yelp Fusion API Web Services] to your Node.js
application.

The Node.js Client for Yelp Fusion is a Node.js Client library for the following Yelp Fusion APIs:

- [Businesses API]
- [Events API]
- [Categories API]

Keep in mind that the same [terms and conditions](https://www.yelp.com/developers/api_terms)
apply to usage of the APIs when they're accessed through this library.

## Attention!

**NOTE:** This library is a work in progress. use or contribute at your own risk.

This library is designed for server-side Node.js applications. Attempting to use it client-side, in either the browser or any other environment like React Native, may in some cases work, but mostly will not. Please refrain from reporting issues with these environments when attempting to use them, since **server-side Node.js applications is the only supported environment for this library**.

## Quick Start

    $ npm install @kob490/yelp-fusion-plus

<!-- Below is a simple example calling the elevation method on the client class.

Import the Yelp Fusion Client using Typescript and ES6 module:

```js
import { Client } from '@kob490/yelp-fusion-plus';
```

Alternatively using JavaScript without ES6 module support:

```js
const { Client } = require('@kob490/yelp-fusion-plus');
```

Now instantiate the client to make a call to one of the APIs.

```js
const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: 'asdf',
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });
``` -->

## Reference Documentation

The generated reference documentation can be found [here](https://kob490.github.io/yelp-fusion-plus/). The TypeScript types are the authoritative documentation for this library and may differ slightly from the descriptions.

## Developing

In order to run the end-to-end tests, you'll need to supply your API key via an environment variable in the .env file.

    YELP_API_KEY=<API Key>

To start working, run the `watch:build` task using [`npm`](https://docs.npmjs.com/getting-started/what-is-npm) or [`yarn`](https://yarnpkg.com/).

```sh
npm run watch:build
```

In another terminal tab/window, run the `watch:test` task:

```sh
npm run watch:test
```

These watch tasks make development much faster and more interactive. They're particularly helpful for [TDD](https://en.wikipedia.org/wiki/Test-driven_development)/[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) workflows.

These watch tasks will build and watch the entire project for changes (to both the library source files and test source files). As you develop, you can add tests for new functionality – which will initially fail – before developing the new functionality. Each time you save, any changes will be rebuilt and retested.

<p align="center">
  <!-- PR request: capture the magic of using a test-running watch task for development -->
  <img alt="typescript-starter's watch task" src="https://user-images.githubusercontent.com/904007/37270842-c05f5192-25a6-11e8-83bb-1981ae48e38e.png">
</p>

Since only changed files are rebuilt and retested, this workflow remains fast even for large projects.

## Support

This library is community supported.

If you find a bug, or have a feature suggestion, please
[log an issue][issues]. If you'd like to contribute, please read
[How to Contribute][contrib].

[apikey]: https://www.yelp.com/developers/documentation/v3/authentication
[yelp fusion api web services]: https://www.yelp.com/fusion
[businesses api]: https://www.yelp.com/developers/documentation/v3/business
[events api]: https://www.yelp.com/developers/documentation/v3/event
[categories api]: https://www.yelp.com/developers/documentation/v3/category
[time zone api]: https://developers.google.com/maps/documentation/timezone/
[issues]: https://github.com/kob490/yelp-fusion-plus/issues
[contrib]: https://github.com/kob490/yelp-fusion-plus/blob/master/CONTRIBUTING.md
[maps javascript api]: https://developers.google.com/maps/documentation/javascript/
