/** @type {import('prettier').Config} */
module.exports = {
  semi: true, // Always add semicolons
  singleQuote: true, // Prefer single quotes over double quotes
  tabWidth: 2, // Set indentation to 2 spaces
  trailingComma: 'all', // Add trailing commas wherever possible
  bracketSpacing: true, // Keep spaces between brackets: { foo: bar }
  arrowParens: 'always', // Always use parentheses in arrow functions: (x) => {}
  printWidth: 100, // Wrap lines at 100 characters
  endOfLine: 'lf', // Force Linux/Mac line endings
};
