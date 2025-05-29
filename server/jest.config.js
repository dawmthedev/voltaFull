module.exports = {
  displayName: 'server-tests',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/server/**/*.test.ts'],
  moduleFileExtensions: ['ts','js','json'],
};
