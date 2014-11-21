// Load in dependencies
var fs = require('fs');
var path = require('path');

// Define and export our install command
exports.installSync = function (destDir) {
  // Load in the files as if they are JS
  // TODO: For browser support, accept an option (e.g. `environment`) and modify the files
  var jscsrcObj = require('./rc/jscsrc');
  var jshintrcObj = require('./rc/jshintrc');

  // Stringify our configs and save them to our destination
  var jscsrc = JSON.stringify(jscsrcObj, null, 2);
  var jshintrc = JSON.stringify(jshintrcObj, null, 2);
  fs.writeFileSync(path.join(destDir, '.jscsrc'), jscsrc, 'utf8');
  fs.writeFileSync(path.join(destDir, '.jshintrc'), jshintrc, 'utf8');
};
