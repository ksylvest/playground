import Vue, { ComponentOptions } from 'vue';
import Auth from '../../models/auth';
import sentence from '../../filters/sentence';

interface Component extends Vue {
  email: string
  password: string
  errors: { string: Array <string> }
  submit(): void
}

export default {
  data: function () {
    return {
      email: null,
      password: null,
      errors: {},
    }
  },
  filters: {
    sentence: sentence,
  },
  methods: {
    submit (): void {
      const auth = new Auth(this.email, this.password)
      auth.save()
        .then((response) => console.log(response))
        .catch((error) => this.errors = error.response.data)
    }
  },
  watch: {
    email (): void {
      Vue.delete(this.errors, 'email')
    },
    password (): void {
      Vue.delete(this.errors, 'password')
    },
  }
} as ComponentOptions <Component>
