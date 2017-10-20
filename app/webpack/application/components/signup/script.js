import Vue from 'vue';

import User from '../../models/user';

import sentence from '../../filters/sentence';

export default {
  data() {
    return {
      errors: {},
      fields: {
        email: null,
        name: null,
        password: null,
      },
    };
  },

  filters: {
    sentence,
  },
  methods: {
    reset(field) {
      Vue.delete(this.errors, field);
    },

    submit() {
      const user = new User(this.fields.name, this.fields.email, this.fields.password);
      user.save()
        .catch((error) => this.errors = error.response.data);
    },
  },
  watch: {
    name() {
      Vue.delete(this.errors, 'name');
    },

    email() {
      Vue.delete(this.errors, 'email');
    },

    password() {
      Vue.delete(this.errors, 'password');
    },
  },
};
