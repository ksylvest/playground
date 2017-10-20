import Vue from 'vue';
import VueRouter from 'vue-router';

import Authenticator from '../components/authenticator';
import Checkout from '../components/checkout';
import Home from '../components/home';
import Login from '../components/login';
import Signup from '../components/signup';

Vue.use(VueRouter);

const routes = [
  {
    component: Home,
    name: 'home',
    path: '/',
  },
  {
    component: Checkout,
    name: 'checkout',
    path: '/checkout',
  },
  {
    children: [
      {
        component: Login,
        name: 'login',
        path: '/login',
      },
      {
        component: Signup,
        name: 'signup',
        path: '/signup',
      },
    ],
    component: Authenticator,
    name: 'auth',
    path: '/',
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
