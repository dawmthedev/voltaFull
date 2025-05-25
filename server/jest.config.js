module.exports = {
  displayName: 'server',
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: [
    '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
    '<rootDir>/../tests/server/**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' }
};
