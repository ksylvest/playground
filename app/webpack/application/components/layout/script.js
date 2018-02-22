export default {
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push({ name: 'home' });
    },
  },
  computed: {
    authenticated() {
      return this.$store.getters.authenticated;
    },
  },
};
