module.exports = {
  displayName: 'client',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './',
  testMatch: [
    '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
    '<rootDir>/../tests/client/**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  moduleNameMapper: { '\\.(css|scss)$': 'identity-obj-proxy' },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts']
};
