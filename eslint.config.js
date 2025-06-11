// eslint.config.js
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.ts"],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single"],
    },
  },
];
