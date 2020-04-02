// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**/environments/**",
    "!**/config/**",
    "!**/actions/**",
    "!**/src/index.js",
    "!**/service-worker/**",
    "!**/styles.js",
    "!**/*.config.js",
    "!**/actionsTypes.js"
  ]
};
