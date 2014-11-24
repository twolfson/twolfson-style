#!/usr/bin/env node
// Load in dependencies
var fs = require('fs');

// Development script to rebuild our critical JSON
var jshintrc = require('../lib/rc/jshintrc.js');

// Build the JSON file
var output = JSON.stringify(jshintrc.critical, null, 2);
fs.writeFileSync(__dirname + '/../lib/rc/jshintrc-critical.json', output);
