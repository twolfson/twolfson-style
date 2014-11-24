/* jshint quotmark:false */
// jscs:disable disallowQuotedKeysInObjects,validateQuoteMarks
// Ignore quote rules. We are trying to make it easy to copy/paste JSON

// JSHint rules
// http://jshint.org/docs/options/

// Inline configuration
// http://jshint.org/docs/

// Load in dependencies
var extend = require('obj-extend');

// Define critical rules for pre-test linting
exports.critical = {
  // Enforcing options
  "eqeqeq": true,
  "freeze": true,
  "immed": true,
  "latedef": true,
  "nonbsp": true,
  "undef": true,
  "strict": false,

  // Environment
  "node": true,

  // Globals
  "globals": {
    "exports": true,
    "describe": true,
    "before": true,
    "beforeEach": true,
    "after": true,
    "afterEach": true,
    "it": true
  }
};

// Define style rules for
exports.style = {
  // Enforcing options
  "curly": true,
  "indent": 2,
  "newcap": true,
  "noarg": true,
  "quotmark": "single",
  // DEV: By using `vars`, we only get errors for unused `vars` but `params` are cool
  "unused": "vars",
  "maxparams": 4,
  "maxdepth": 5,
  // DEV: We are using jscs' line length instead since it allows URLs
  // "maxlen": 120,

  // Relaxing options
  "sub": true
};

// Combine the two as our config
exports.config = extend(exports.critical, exports.style);
