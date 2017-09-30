import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  notes: [],
  selection: {}
};

const mutations = {
};

export default new Vuex.Store({ actions, getters, state, mutations });
