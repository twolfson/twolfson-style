// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var twolfsonStyle = require('../');

// Define test utilities
var testUtils = {

};

// Start our tests
describe('twolfson-style', function () {
  describe('installing into a directory', function () {
    it('adds our .jshintrc and .jscsrc files', function () {
      assert.strictEqual(twolfsonStyle(), 'awesome');
    });
  });
});
