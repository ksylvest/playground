import axios from 'axios';

import Vue, { ComponentOptions } from 'vue';

class Errors {
  any() {
    return !!this.data;
  }

  seed(data) {
    this.data = data;
  }

  reset() {
    delete this.data;
  }

  has(field) {
    return this.data && !!this.data[field];
  }

  get(field) {
    if (this.data) {
      return this.data[field];
    }
  }
}

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

  methods: {
    submit() {
      this.form.save();
    },
  },
};
