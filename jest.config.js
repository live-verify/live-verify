module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/webapp-playwright-tests/',
    '/_site/',
    '/test-results/'
  ],
  collectCoverageFrom: [
    'public/**/*.js',
    'apps/browser-extension/shared/**/*.js',

    '!jest.config.js',
    '!webpack.config.js'
  ],
  // Transform browser extension ES modules for Jest
  transform: {
    'apps/browser-extension/shared/.*\\.js$': '<rootDir>/jest-esm-transformer.js'
  }
};
