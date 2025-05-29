module.exports = {
  projects: [
    '<rootDir>/server/jest.config.js',
    '<rootDir>/client/jest.config.js'
  ],
  testMatch: [
    '<rootDir>/tests/server/**/*.test.ts',
    '<rootDir>/tests/client/**/*.{test,spec}.{ts,tsx}'
  ],
  verbose: true
};
