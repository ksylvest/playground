const { merge, webpackConfig } = require("@rails/webpacker");

const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const path = require("path");

const root = path.resolve(__dirname, "..", "..", "app", "packs");
console.log(root);

module.exports = merge(webpackConfig, {
  plugins: [new ForkTSCheckerWebpackPlugin()],
  externals: {
    stripe: "Stripe",
  },
  resolve: {
    alias: {
      "@root": root,
      "@application": path.resolve(root, "application"),
    },
    extensions: [".sass", ".scss", ".css"],
  },
});
