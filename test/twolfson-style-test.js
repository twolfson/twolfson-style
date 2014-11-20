// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var exec = require('child_process').exec;
var quote = require('shell-quote').quote;
var tmp = require('tmp');
var twolfsonStyle = require('../');

// Define test utilities
var testUtils = {
  moveToTmpDir: function () {
    // Create a temporary directory
    before(function createTmpFn (done) {
      var that = this;
      tmp.dir(function handleTmpDir (err, dirpath) {
        that.dirpath = dirpath;
        done(err);
      });
    });

    // Navigate to our new directory
    before(function () {
      console.log(this.dirpath);
      this.oldDir = process.cwd();
      process.chdir(this.dirpath);
    });

    // Move back and cleanup
    after(function cleanup () {
      process.chdir(this.oldDir);
      delete this.dirpath;
      delete this.oldDir;
    });
  },
  exec: function (cmd, options) {
    // Run exec and save results
    before(function execFn () {
      var that = this;
      exec(cmd, options, function handleExec (err, stdout, stderr) {
        that.err = err;
        that.stdout = stdout;
        that.stderr = stderr;
      });
    });

    // Clean up results
    after(function cleanup () {
      delete this.err;
      delete this.stdout;
      delete this.stderr;
    });
  }
};

// Start our tests
describe('twolfson-style', function () {
  describe('installing into a directory', function () {
    testUtils.moveToTmpDir();
    testUtils.exec(quote([__dirname + '/../bin/twolfson-style', 'install']));

    it('had no errors', function () {
      assert.strictEqual(this.err, null);
    });

    it('adds our .jshintrc and .jscsrc files', function () {
      assert.strictEqual(twolfsonStyle(), 'awesome');
    });
  });
});
