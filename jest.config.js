module.exports = {
  moduleFileExtensions: ["ts", "js", "json"],
  testEnvironment: "jest-environment-jsdom-global",
  coverageThreshold: {
    global: {
      branches: 83,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
