const { environment } = require('@rails/webpacker');

const path = require('path');

const root = path.join(__dirname, '..', '..', 'app', 'webpack');

environment.config.merge({
  externals: {
    stripe: 'Stripe',
  },
  resolve: {
    alias: {
      '@root': root,
      '@application': path.join(root, 'application'),
    },
  },
});

module.exports = environment;
