import Vue, { ComponentOptions } from 'vue';
import Login from '../login';
import Signup from '../signup';
import Social from '../social';

interface Component extends Vue {
}

export default {
  components: { Login, Signup, Social },
} as ComponentOptions <Component>
