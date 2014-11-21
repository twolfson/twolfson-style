// Load in dependencies
var exec = require('child_process').exec;
var expect = require('chai').expect;
var glob = require('glob');
var quote = require('shell-quote').quote;

// Define test utilities
var testUtils = {
  lint: function (filepath) {
    // Lint our file with both JSCS and JSHint
    before(function lintFn (done) {
      // Generate our command
      var subcmd = quote(['jshint', filepath, '&&', 'jscs', filepath]);
      var cmd = quote(['sh', '-c', subcmd]);

      // Run the command and save our results
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
  }
};

// Start our tests
glob.sync('node/invalid-*.js', {cwd: __dirname + '/test-files/'}).forEach(function checkInvalidFile (_filepath) {
  var filepath = __dirname + '/test-files/' + _filepath;
  describe('An invalid file "' + _filepath + '"', function () {
    describe('when linted', function () {
      testUtils.lint(filepath);

      it('receives its expected error', function () {
        var expected = require(filepath).expected;
        expect(this.err).to.not.equal(null);
        expect(this.stderr).to.match(expected);
      });
    });
  });
});
