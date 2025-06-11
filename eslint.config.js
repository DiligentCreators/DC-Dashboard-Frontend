import js from "@eslint/js";
import nuxt from "eslint-plugin-nuxt";

export default [
  {
    ignores: [".nuxt/**", "node_modules/**", "dist/**"],
  },
  js.configs.recommended,
  nuxt.configs.recommended,
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      globals: {
        useCookie: "readonly",
        useFetch: "readonly",
        useRequestHeaders: "readonly",
        $fetch: "readonly",
        defineStore: "readonly",
      },
    },
    rules: {
      // Style rules Prettier handles — disabled here to avoid conflicts
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      "max-len": "off",
      "no-mixed-operators": "off",
      "comma-dangle": "off",
      "function-paren-newline": "off",
      "implicit-arrow-linebreak": "off",
      "object-curly-newline": "off",
      "operator-linebreak": "off",
      "quote-props": "off",
      "wrap-iife": "off",
      "no-tabs": "off",

      // Your preferred rules
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
];
