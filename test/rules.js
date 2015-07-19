// Load in dependencies
var exec = require('child_process').exec;
var expect = require('chai').expect;
var glob = require('glob');
var path = require('path');
var quote = require('shell-quote').quote;

// Define test utilities
var testUtils = {
  exec: function (cmd) {
    // Run the command and save our results
    before(function execCmd (done) {
      var that = this;
      exec(cmd, function handleExec (err, stdout, stderr) {
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
  },
  precheck: function (filepath) {
    // Generate our command
    var jshintCmd = require.resolve('jshint/bin/jshint');
    var cmd = quote([jshintCmd, '--config', path.join(__dirname, '/../lib/rc/jshintrc-critical.json'), filepath]);
    console.log(path.join(__dirname, '/../lib/rc/jshintrc-critical.json'), filepath);
    testUtils.exec(cmd);
  },
  lint: function (filepath) {
    // Lint our file with both JSCS and JSHint
    var jshintCmd = require.resolve('jshint/bin/jshint');
    var jscsCmd = require.resolve('jscs/bin/jscs');
    var cmd = quote(['bash', '-c', [jshintCmd, filepath, '&&', jscsCmd, filepath].join(' ')]);
    testUtils.exec(cmd);
  }
};

// Start our tests
glob.sync('node/invalid-*.js', {cwd: __dirname + '/test-files/'}).forEach(function checkInvalidFile (_filepath) {
  var filepath = path.join(__dirname, 'test-files', _filepath);
  describe('An invalid file "' + _filepath + '"', function () {
    describe('when linted', function () {
      testUtils.lint(filepath);

      it('receives its expected error', function () {
        var expected = require(filepath).expected;
        expect(this.err).to.not.equal(null);
        expect(this.stdout).to.match(expected);
      });
    });
  });
});

glob.sync('node/valid-*.js', {cwd: __dirname + '/test-files/'}).forEach(function checkValidFile (_filepath) {
  var filepath = path.join(__dirname, 'test-files', _filepath);
  describe('A valid file "' + _filepath + '"', function () {
    describe('when linted', function () {
      testUtils.lint(filepath);

      it('has no errors', function () {
        expect(this.err).to.equal(null);
      });
    });
  });
});

glob.sync('node/precheck-*.js', {cwd: __dirname + '/test-files/'}).forEach(function checkInvalidFile (_filepath) {
  var filepath = path.join(__dirname, 'test-files', _filepath);
  describe('A precheck valid file "' + _filepath + '"', function () {
    describe('when prechecked', function () {
      testUtils.precheck(filepath);

      it('has no errors', function () {
        expect(this.err).to.equal(null);
      });
    });

    describe('when linted', function () {
      testUtils.lint(filepath);

      it('receives its expected error', function () {
        var expected = require(filepath).expected;
        expect(this.err).to.not.equal(null);
        expect(this.stdout).to.match(expected);
      });
    });
  });
});
