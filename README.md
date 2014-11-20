# twolfson-style [![Build status](https://travis-ci.org/twolfson/twolfson-style.png?branch=master)](https://travis-ci.org/twolfson/twolfson-style)

Lint and style configurations for [@twolfson][]

This was built to create a common versioned location for [@twolfson's][@twolfson] style choices.

Currently, we are leveraging [`jscs`][], a tool built exclusively for verifying consistent style, and [`jshint`][], a tool that performs both linting and style checking.

[@twolfson]: http://github.com/twolfson/
[`jscs`]: https://github.com/jscs-dev/node-jscs
[`jshint`]: http://jshint.org/

## Getting Started
Install the module with: `npm install twolfson-style`

Then, install the `.jscsrc` and `.jshintrc` to your project's repo:

```bash
# Copy over `rc` files
# `./node_modules/.bin/` can be removed if you are in a `npm-run-script` context
./node_modules/.bin/twolfson-style install

# Verify we have added the files
ls .js*
# .jscsrc  .jshintrc
```

These files can be integrated with [`jscs`][] and [`jshint`][] respectively. A common usage is an [`npm-run-script`][]:

```js
// DEV: By providing a `lib/` instead of `lib/*.js`, both `jscs` and `jshint` recurse the directory (e.g. `lib/hello/world.js`)
"lint": "jshint lib/ test/ && jscs lib/ test/"
```

[`npm-run-script`]: https://www.npmjs.org/doc/cli/npm-run-script.html

## Documentation
### CLI

### Library versions
We use the same

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.png
[gratipay]: https://www.gratipay.com/twolfson/

## Unlicense
As of Nov 20 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
