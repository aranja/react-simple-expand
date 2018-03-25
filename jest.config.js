const jestConfig = require('kcd-scripts/jest')

module.exports = Object.assign(jestConfig, {
  setupFiles: ['<rootDir>/tests.setup.js'],

  // TODO: Remove once we have tested all setState logic.
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
})
