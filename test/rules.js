// Load in dependencies
var assert = require('assert');
var exec = require('child_process').exec;
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
