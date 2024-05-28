import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: { globals: globals.node },
    env: {
      jest: true,
      node: true,
    },
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    overrides: [
      {
        files: ["tests/**/*"],
        plugins: ["jest"],
        env: {
          jest: true,
          "jest/globals": true,
        },
      },
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];