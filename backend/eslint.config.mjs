// @ts-check
import { defineConfig } from "eslint/config";
import tsEslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig({
    files: ["**/*.ts"],

    plugins: {
        "@typescript-eslint": tsEslint.plugin,
        "unused-imports": unusedImports,
    },
    languageOptions: {
        parser: tsEslint.parser,
        parserOptions: {
            projectService: true,
        },
    },
    rules: {
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
            },
        ],
    },
});
