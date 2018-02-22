import axios from 'axios';
import Vue from 'vue';
import sentence from '../../filters/sentence';
import Errors from '../../utilities/errors';

import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

class Form {
  constructor(attributes) {
    this.errors = new Errors();
    for (let key of Object.keys(attributes)) {
      this[key] = attributes[key];
    }
  }

  get params() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }

  valid(field) {
    return this.errors.any() && !this.errors.has(field);
  }

  invalid(field) {
    return this.errors.any() && this.errors.has(field);
  }
}

export default {
  data() {
    return {
      form: new Form({
        name: null,
        email: null,
        password: null,
      }),
    };
  },

  components: {
    FontAwesomeIcon,
  },

  filters: {
    sentence,
  },

  methods: {
    async submit() {
      try {
        await this.$store.dispatch('signup', this.form.params);
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.form.errors.seed(error.response.data);
      }
    },
  },
};
