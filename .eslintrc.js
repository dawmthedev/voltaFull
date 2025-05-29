module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './server/tsconfig.json',
      './client/tsconfig.json'
    ]
  },
  ignorePatterns: [
    'node_modules/',
    'client/jest.config.js',
    'server/jest.config.js',
    'server/webpack.config.js',
    'tests/**/*.js'
  ],
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // Add any project-specific overrides here
  }
};
