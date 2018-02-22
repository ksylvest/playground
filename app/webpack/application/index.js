import 'babel-polyfill';

import './assets';
import './config';

import Vue from 'vue';

import Layout from './components/layout';

import router from './router';
import store from './store';

new Vue({
  components: { layout: Layout },
  router,
  store,
}).$mount('#app');
