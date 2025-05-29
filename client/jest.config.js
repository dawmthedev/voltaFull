module.exports = {
  displayName: 'client-tests',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts','tsx','js','jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testMatch: ['<rootDir>/tests/client/**/*.{test,spec}.{ts,tsx}'],
  verbose: true
};
