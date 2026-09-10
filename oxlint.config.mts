import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript", "unicorn", "oxc"],
  rules: {
    "react/no-children-prop": "off",
    "react/set-state-in-effect": "off",
    "react-hooks/exhaustive-deps": "off",
  },
});
