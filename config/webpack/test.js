const merge = require('webpack-merge');
const environment = require('./environment');
const custom = require('./custom');

module.exports = merge(environment.toWebpackConfig(), custom);
