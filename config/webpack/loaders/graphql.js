const path = require('path');

module.exports = {
  test: /\.(graphql|gql)$/,
  exclude: ['node_modules', 'public', 'vendor', 'tmp'].map(name =>
    path.resolve(__dirname, `../../../${name}`)),
  use: [{
    loader: 'graphql-tag/loader',
  }],
};
