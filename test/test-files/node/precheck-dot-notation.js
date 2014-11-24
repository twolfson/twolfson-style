// Define our expectations for the test
exports.expected = /\['hello'\] is better written in dot notation/i;

// Don't require dot notation in critical but do in lint
var obj = {};
obj['hello'] = true;
