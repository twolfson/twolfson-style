// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var exec = require('child_process').exec;
var quote = require('shell-quote').quote;
var tmp = require('tmp');

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
    before(function moveFn () {
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
    before(function execFn (done) {
      var that = this;
      exec(cmd, options, function handleExec (err, stdout, stderr) {
        that.err = err;
        that.stdout = stdout;
        that.stderr = stderr;
        done();
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
    testUtils.exec(quote(['node', __dirname + '/../bin/twolfson-style', 'install']));

    it('has no errors', function () {
      assert.strictEqual(this.err, null);
    });

    it('adds our .jscsrc file', function () {
      var actualFile = fs.readFileSync(this.dirpath + '/.jscsrc', 'utf8');
      var expectedFile = fs.readFileSync(__dirname + '/expected-files/node/.jscsrc', 'utf8');
      assert.deepEqual(JSON.parse(actualFile), JSON.parse(expectedFile));
    });

    it('adds our .jshintrc file', function () {
      var actualFile = fs.readFileSync(this.dirpath + '/.jshintrc', 'utf8');
      var expectedFile = fs.readFileSync(__dirname + '/expected-files/node/.jshintrc', 'utf8');
      assert.deepEqual(JSON.parse(actualFile), JSON.parse(expectedFile));
    });
  });
});

describe('twolfson-style', function () {
  describe('prechecking a file with a critical issue', function () {
    var filepath = __dirname + '/test-files/node/invalid-unused.js';
    testUtils.exec(quote([__dirname + '/../bin/twolfson-style', 'precheck', filepath]));

    it('has an error errors', function () {
      assert.notEqual(this.err, null);
    });

    it.skip('complains critical issue', function () {
      var expectedError = require(filepath).expected;
      // assert.deepEqual(JSON.parse(actualFile), JSON.parse(expectedFile));
    });
  });

  describe.skip('prechecking a file with a stylistic issue', function () {
    testUtils.exec(quote([__dirname + '/../bin/twolfson-style', 'precheck', __dirname + '/test-files/node/invalid-unused.js']));

    it('has no errors', function () {
      assert.strictEqual(this.err, null);
    });
  });
});
