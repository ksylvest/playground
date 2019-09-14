const { environment } = require('@rails/webpacker');
const graphql =  require('./loaders/graphql');
const typescript =  require('./loaders/typescript');
const path = require('path');

environment.loaders.prepend('graphql', graphql);
environment.loaders.prepend('typescript', typescript);

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
