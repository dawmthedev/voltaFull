module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true, // added to output detailed test results
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts']
};
