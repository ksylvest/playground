import Vue from 'vue/dist/vue.esm';
import Greeter from './components/greeter.vue';

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      message: 'Hello!',
    },
    components: { Greeter },
  });
});
