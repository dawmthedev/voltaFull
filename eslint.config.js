// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true
});

export default [
  // 1) Extend recommended configs
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ),

  // 2) Our overrides
  {
    ignores: [
      "node_modules/**",
      "client/jest.config.js",
      "server/jest.config.js",
      "server/webpack.config.js",
      "tests/**/*.js"
    ],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./server/tsconfig.json", "./client/tsconfig.json"]
      }
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
    },
    rules: {
      // project-specific overrides
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  }
];
