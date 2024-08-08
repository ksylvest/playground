import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["app/assets/builds/**/*", "app/packs/app_schema.*", "coverage/**/*", "vendor/**/*"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
];
