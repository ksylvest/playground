import Vue, { ComponentOptions } from 'vue';
import User from '../../models/user';
import sentence from '../../filters/sentence';

interface Component extends Vue {
  name: string
  email: string
  password: string
  errors: { string: Array <string> }
  submit(): void
}

export default {
  data: function () {
    return {
      name: null,
      email: null,
      password: null,
      errors: {},
    }
  },
  filters: {
    sentence: sentence,
  },
  methods: {
    reset (field: string): void {
      Vue.delete(this.errors, field)
    },
    submit (): void {
      const user = new User(this.name, this.email, this.password)
      user.save()
        .then((response) => console.log(response))
        .catch((error) => this.errors = error.response.data)
    },
  },
  watch: {
    name (): void {
      Vue.delete(this.errors, 'name')
    },
    email (): void {
      Vue.delete(this.errors, 'email')
    },
    password (): void {
      Vue.delete(this.errors, 'password')
    },
  }
} as ComponentOptions <Component>
