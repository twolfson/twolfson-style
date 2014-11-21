/* jshint quotmark:false */
// jscs:disable disallowQuotedKeysInObjects,validateQuoteMarks
// Ignore quote rules. We are trying to make it easy to copy/paste JSON
module.exports = {
  "curly": true,
  "eqeqeq": true,
  "freeze": true,
  "immed": true,
  "indent": 2,
  "latedef": true,
  "newcap": true,
  "noarg": true,
  "nonbsp": true,
  "quotmark": "single",
  "undef": true,
  "unused": true,
  "strict": false,
  "maxparams": 4,
  "maxdepth": 5,
  "maxlen": 120,

  "sub": true,

  "node": true,
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
