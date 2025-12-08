import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
   globalIgnores(["dist"]),
   {
      files: ["**/*.{js,jsx}"],
      extends: [
         js.configs.recommended,
         reactRefresh.configs.vite,
         reactHooks.configs["recommended-latest"],
      ],
      settings: {
         react: {
            version: "detect",
         },
      },
      languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser,
         parserOptions: {
            ecmaVersion: "latest",
            ecmaFeatures: { jsx: true },
            sourceType: "module",
         },
      },
   },
   react.configs.flat.recommended,
   {
      rules: {
         "no-unused-vars": "warn",
         "no-console": "warn",

         "react/prop-types": "off",
         "react/react-in-jsx-scope": "off",
      },
   },
]);
