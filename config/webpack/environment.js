const { environment } = require('@rails/webpacker');
const graphql =  require('./loaders/graphql');
const typescript =  require('./loaders/typescript');

environment.loaders.prepend('graphql', graphql);
environment.loaders.prepend('typescript', typescript);
module.exports = environment;
