const { environment } = require('@rails/webpacker');
const graphql =  require('./loaders/graphql');
const typescript =  require('./loaders/typescript');
const path = require('path');

environment.loaders.prepend('graphql', graphql);
environment.loaders.prepend('typescript', typescript);

environment.config.merge({
  resolve: {
    alias: {
      '@application': path.join(__dirname, '..', '..', 'app', 'webpack', 'application'),
    },
  },
});

module.exports = environment;
