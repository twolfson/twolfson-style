// Define our expectations for the test
exports.expected = /Line must be at most 120 characters/i;

// We don't allow statements over 120 characters
var statement = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
void statement;
