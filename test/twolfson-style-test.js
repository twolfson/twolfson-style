// Load in dependencies
var assert = require('assert');
var twolfsonStyle = require('../');

// Start our tests
describe('twolfson-style', function () {
  it('returns awesome', function () {
    assert.strictEqual(twolfsonStyle(), 'awesome');
  });
});
