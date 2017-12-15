const { environment } = require('@rails/webpacker');

environment.config.merge({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm',
      vuex: 'vuex/dist/vuex.esm',
      'vue-router': 'vue-router/dist/vue-router.esm',
    },
  },
});

module.exports = environment;
