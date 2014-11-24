// Load in dependencies
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

// Define and export our install command
exports.installSync = function (destDir) {
  // Load in the files as if they are JS
  // TODO: For browser support, accept an option (e.g. `environment`) and modify the files
  var jscsrcObj = require('./rc/jscsrc');
  var jshintrcObj = require('./rc/jshintrc');

  // Stringify our configs and save them to our destination
  var jscsrc = JSON.stringify(jscsrcObj.config, null, 2) + '\n';
  var jshintrc = JSON.stringify(jshintrcObj.config, null, 2) + '\n';
  fs.writeFileSync(path.join(destDir, '.jscsrc'), jscsrc, 'utf8');
  fs.writeFileSync(path.join(destDir, '.jshintrc'), jshintrc, 'utf8');
};

exports.precheck = function (pathArr, options, done) {
  // Add on the config parameter to our paths
  var args = pathArr.slice();
  args.unshift('--config', __dirname + '/rc/jshintrc-critical.json');

  // Start a jshint script
  var jshintChild = spawn('jshint', args, {
    // [stdin, stdout, stderr]
    stdio: [null, options.stdout, options.stderr]
  });

  // When it leaves, callback
  jshintChild.on('exit', function handleExit (code, signal) {
    if (code !== 0) {
      var err = new Error('`jshint` did not exit with 0 exit code');
      err.code = code;
      err.signal = signal;
      return done(err);
    } else {
      return done();
    }
  });
};
