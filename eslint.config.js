import js from "@eslint/js";
import nuxt from "eslint-plugin-nuxt";
import prettier from "eslint-config-prettier";

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
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
  prettier, // ⬅️ Add this last to disable formatting conflicts
];
