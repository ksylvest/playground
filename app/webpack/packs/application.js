require('./application/vendor/assets.sass');

import './application/config/axios';

import Vue from 'vue/dist/vue.esm';
import Authenticator from './application/components/authenticator.vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    components: { Authenticator },
  });
});
