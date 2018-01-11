const { dev_server: server } = require('@rails/webpacker').config;

const production = process.env.NODE_ENV === 'production';
const development = process.argv.find(arg => arg.includes('webpack-dev-server'));
const extractCSS = !(development && (server && server.hmr)) || production;

module.exports = {
  test: /\.vue(\.erb)?$/,
  use: [
    {
      loader: 'vue-loader',
      options: { extractCSS },
    },
  ],
};
