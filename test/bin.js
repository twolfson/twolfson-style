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

    it('complains about the issue', function () {
      var expectedError = require(filepath).expected;
      assert(this.stdout.match(expectedError));
    });
  });

  describe('prechecking a file with a stylistic issue', function () {
    var filepath = __dirname + '/test-files/node/invalid-curly-braces.js';
    testUtils.exec(quote([__dirname + '/../bin/twolfson-style', 'precheck', filepath]));

    it('has no errors', function () {
      assert.strictEqual(this.err, null);
    });
  });
});

describe('twolfson-style', function () {
  describe('linting a file with a JSHint issue', function () {
    var filepath = __dirname + '/test-files/node/invalid-unused.js';
    testUtils.exec(quote([__dirname + '/../bin/twolfson-style', 'lint', filepath]));

    it('has an error errors', function () {
      assert.notEqual(this.err, null);
    });

    it('complains about the issue', function () {
      var expectedError = require(filepath).expected;
      assert(this.stdout.match(expectedError));
    });
  });

  describe('linting a file with a JSCS issue', function () {
    var filepath = __dirname + '/test-files/node/invalid-line-length.js';
    testUtils.exec(quote([__dirname + '/../bin/twolfson-style', 'lint', filepath]));

    it('complains about the issue', function () {
      var expectedError = require(filepath).expected;
      assert(this.stdout.match(expectedError));
    });
  });

  describe('linting a file with no issues', function () {
    var filepath = __dirname + '/test-files/node/valid-line-length.js';
    testUtils.exec(quote([__dirname + '/../bin/twolfson-style', 'lint', filepath]));

    it('has no errors', function () {
      assert.strictEqual(this.err, null);
    });
  });
});

// Edge cases
// DEV: For sanity, verify that our critical JSON and `jshint.critical` always line up
describe('Our critical jshint config', function () {
  it('is in sync with our source jshint config', function () {
    var actualJson = require(__dirname + '/../lib/rc/jshintrc-critical.json');
    var expectedJson = require(__dirname + '/../lib/rc/jshintrc.js').critical;
    assert.deepEqual(actualJson, expectedJson);
  });
});
