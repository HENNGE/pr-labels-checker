module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  clearMocks: true,
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  testMatch: ["**/__tests__/**/*.js", "**/*.test.js"],
  verbose: true,
};
