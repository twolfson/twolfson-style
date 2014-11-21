/* jshint quotmark:false */
// jscs:disable disallowQuotedKeysInObjects,validateQuoteMarks
// Ignore quote rules. We are trying to make it easy to copy/paste JSON
module.exports = {
  "requireCurlyBraces": true,
  // TODO: Upon next JSCS release, add this back:
  // "requireSpaceBeforeKeywords": true,
  "requireSpaceAfterKeywords": true,
  "requireSpaceBeforeBlockStatements": true,
  "requireSpacesInConditionalExpression": true,
  "requireSpacesInFunctionExpression": {
    "beforeOpeningRoundBrace": true,
    "beforeOpeningCurlyBrace": true
  },
  "requireSpacesInFunctionDeclaration": {
    "beforeOpeningCurlyBrace": true
  },
  "disallowSpacesInFunctionDeclaration": {
    "beforeOpeningRoundBrace": true
  },
  "disallowSpacesInCallExpression": true,
  "disallowMultipleVarDecl": true,
  "requireBlocksOnNewline": 1,
  "disallowPaddingNewlinesInBlocks": true,
  "disallowSpacesInsideObjectBrackets": "all",
  "disallowSpacesInsideArrayBrackets": "all",
  "disallowSpacesInsideParentheses": true,
  "disallowQuotedKeysInObjects": "allButReserved",
  "disallowSpaceAfterObjectKeys": true,
  "requireSpaceBeforeObjectValues": true,
  "requireCommaBeforeLineBreak": true,
  "requireOperatorBeforeLineBreak": true,
  "disallowSpaceAfterPrefixUnaryOperators": true,
  "disallowSpaceBeforePostfixUnaryOperators": true,
  "requireSpaceBeforeBinaryOperators": true,
  "requireSpaceAfterBinaryOperators": true,
  "requireCamelCaseOrUpperCaseIdentifiers": "ignoreProperties",
  "disallowKeywords": [
    "with"
  ],
  "disallowMultipleLineStrings": true,
  "disallowMultipleLineBreaks": true,
  "disallowMixedSpacesAndTabs": true,
  "disallowTrailingWhitespace": true,
  "disallowTrailingComma": true,
  "disallowKeywordsOnNewLine": [
    "else",
    "catch",
    "finally"
  ],
  "requireLineFeedAtFileEnd": true,
  "maximumLineLength": {
    "value": 120,
    "allowUrlComments": true
  },
  // TODO: Upon next JSCS release, add this back:
  // "requiredCapitalizedConstructors": true,
  "requireDotNotation": true,
  "disallowYodaConditions": true,
  "requireSpaceAfterLineComment": true,
  "disallowNewlineBeforeBlockStatements": true,
  "validateLineBreaks": "LF",
  "validateQuoteMarks": {
    "mark": "'",
    "escape": true
  },
  "validateIndentation": 2,
  "validateParameterSeparator": ", ",
  "safeContextKeyword": [
    "that"
  ]
};
