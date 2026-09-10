import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: [".github/**/*", "config/**/*", "public/**/*", "spec/vcr/**/*", "vendor/**/*"],
  printWidth: 120,
  sortImports: {
    customGroups: [
      {
        groupName: "react",
        elementNamePattern: ["react", "react*", "react*/*"],
      },
      {
        groupName: "lodash",
        elementNamePattern: ["lodash/*"],
      },
      {
        groupName: "tights",
        elementNamePattern: ["tights"],
      },
      {
        groupName: "apollo",
        elementNamePattern: ["@apollo/**"],
      },
      {
        groupName: "emotion",
        elementNamePattern: ["@emotion/*"],
      },
      {
        groupName: "fortawesome",
        elementNamePattern: ["@fortawesome/**"],
      },
      {
        groupName: "rails",
        elementNamePattern: ["@rails/*"],
      },
      {
        groupName: "root",
        elementNamePattern: ["@root/**"],
      },
      {
        groupName: "application-types",
        elementNamePattern: ["@application/types/**"],
      },
      {
        groupName: "application-config",
        elementNamePattern: ["@application/config/**"],
      },
      {
        groupName: "application-contexts",
        elementNamePattern: ["@application/contexts/**"],
      },
      {
        groupName: "application-hooks",
        elementNamePattern: ["@application/hooks/**"],
      },
      {
        groupName: "application-utilities",
        elementNamePattern: ["@application/utilities/**"],
      },
      {
        groupName: "application-components",
        elementNamePattern: ["@application/components/**"],
      },
      {
        groupName: "application-loaders",
        elementNamePattern: ["@application/loaders/**"],
      },
    ],
    groups: [
      "react",
      "lodash",
      "tights",
      "apollo",
      "emotion",
      "fortawesome",
      "rails",
      "root",
      "application-types",
      "application-config",
      "application-contexts",
      "application-hooks",
      "application-utilities",
      "application-components",
      "application-loaders",
    ],
  },
});
