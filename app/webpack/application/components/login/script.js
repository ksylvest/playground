import axios from 'axios';
import Vue from 'vue';
import sentence from '../../filters/sentence';
import Errors from '../../utilities/errors';

class Form {
  constructor(attributes) {
    this.errors = new Errors();
    for (let key of Object.keys(attributes)) {
      this[key] = attributes[key];
    }
  }

  get params() {
    return {
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

  save() {
    return axios.post('/auth', this.params)
      .then(() => { this.errors.reset(); })
      .catch((error) => { this.errors.seed(error.response.data); });
  }
}

export default {
  data() {
    return {
      form: new Form({
        email: null,
        password: null,
      }),
    };
  },

  filters: {
    sentence,
  },

  methods: {
    submit() {
      this.form.save();
    },
  },
};
