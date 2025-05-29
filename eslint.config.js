// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";

const compat = new FlatCompat({
  baseDirectory: new URL(".", import.meta.url).pathname,
  recommendedConfig: {},
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
      "tests/**/*.js",
    ],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
        project: ["./server/tsconfig.json", "./client/tsconfig.json"],
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
    rules: {
      // project-specific overrides
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];
