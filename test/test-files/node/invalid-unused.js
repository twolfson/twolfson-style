// Define our expectations for the test
exports.expected = /'iWasNeverDeclared' is not defined/i;

// For critical style checks, guarantee we complain when a variable hasn't been defined
function main() {
  iWasNeverDeclared;
}
