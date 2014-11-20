// Load in dependencies
var fs = require('fs');
var path = require('path');

// Define and export our install command
exports.installSync = function (destDir) {
  // Copy over each of the .jscsrc and .jshintrc files to the destination
  // TODO: For browser support, accept an option the environment and modify the files
  var jscsrc = fs.readFileSync(__dirname + '/../.jscsrc', 'utf8');
  var jshintrc = fs.readFileSync(__dirname + '/../.jshintrc', 'utf8');
  fs.writeFileSync(path.join(destDir, '.jscsrc'), jscsrc, 'utf8');
  fs.writeFileSync(path.join(destDir, '.jshintrc'), jshintrc, 'utf8');
};
