# twolfson-style [![Build status](https://travis-ci.org/twolfson/twolfson-style.png?branch=master)](https://travis-ci.org/twolfson/twolfson-style)

Lint and style configurations for [@twolfson][]

This was built to create a common versioned location for [@twolfson's][@twolfson] style choices.

Currently, we are leveraging [`jscs`][], a tool for verifying consistent style, and [`jshint`][], a tool that performs both linting and style checking.

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

We provide a precheck utility to prevent critical JS errors before running tests.

```js
// Verifies only critical lint errors (e.g. using an undeclared variable)
"precheck": "twolfson-style precheck lib/ test/"
```

## Documentation
### CLI
`twolfson-style` installs a `twolfson-style` executable:

```bash
$ bin/twolfson-style --help

  Usage: twolfson-style [options] [command]

  Commands:

    install [dir]       Install style `rc` configuration files to `dir` or the current directory
    precheck <path...>  Run critical style checks (e.g. using an undeclared variable)

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

#### `install [dir]`
The `install` command copies over the `.jscsrc` and `.jshintrc` files to a specified directory, `dir`, or the current working directory, `process.cwd()`.

Currently, we only provide `node` styles but in the future, we are considering adding `--env browser` to alter the styles for browser linting.

```bash
# Copy over `rc` files
twolfson-style install

# List our new files
ls .js*
# .jscsrc  .jshintrc
```

#### `precheck [dir]`
The `precheck` command checks for critical lint errors (e.g. using an undeclared variable).

```bash
twolfson-style precheck docs/precheck.js
# docs/precheck.js: line 1, col 13, 'iWasNeverUndeclared' is not defined.
#
# 1 error
```

### Library versions
The supported [`jscs`][] and [`jshint`][] versions are the same as this package's [`package.json`][].

[`package.json`][]

[`package.json`]: package.json

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
