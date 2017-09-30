import './config/frameworks';

import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from './components/layout';

import routes from './config/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

new Vue({
  router: router,
  components: { layout: Layout },
}).$mount('#app');
