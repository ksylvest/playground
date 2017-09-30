import Vue, { ComponentOptions } from 'vue';
import Login from '../login';
import Signup from '../signup';
import Social from '../social';

const loginMode = 'login';
const signupMode = 'signup';
const defaultMode = loginMode;

interface Component extends Vue {
  mode: string
  login (): void
  signup (): void
}

export default {
  components: { Login, Signup, Social },
  data: function () {
    return {
      mode: defaultMode
    }
  },
  methods: {
    login: function () {
      this.mode = loginMode
    },
    signup: function () {
      this.mode = signupMode
    },
  }
} as ComponentOptions <Component>
