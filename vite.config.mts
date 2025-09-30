import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import ruby from "vite-plugin-ruby";

export default defineConfig({
  plugins: [ruby(), react()],
  resolve: {
    alias: {
      "@application": path.resolve(__dirname, "app", "packs", "application"),
      "@root": path.resolve(__dirname, "app", "packs"),
    },
  },
});
