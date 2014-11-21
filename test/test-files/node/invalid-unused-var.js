// Define our expectations for the test
exports.expected = /'hello' is defined but never used/i;

// If a `var` is declared, it must be used
var hello = 'world';
