module.exports = {
  displayName: 'client-tests',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts','tsx','js','jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@chakra-ui/icons$': '<rootDir>/__mocks__/chakra.js',
    '^@chakra-ui/utils/.*$': '<rootDir>/__mocks__/chakra.js'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: ['<rootDir>/../tests/client/**/*.{test,spec}.{ts,tsx}'],
  verbose: true
};
