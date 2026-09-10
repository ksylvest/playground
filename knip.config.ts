import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["app/packs/entrypoints/*.*"],
  project: ["app/packs/**/*"],
  ignoreDependencies: ["bulma"],
};

export default config;
