import axios from 'axios';
import * as types from '../types';

const actions = {
  login({ commit, state }, params) {
    commit(types.LOGIN_REQUEST);
    axios.post('/auth', params)
      .then((response) => commit(types.LOGIN_SUCCESS, { response }))
      .catch((error) => commit(types.LOGIN_FAILURE, { error }));
  },
};

const mutations = {
  [types.LOGIN_REQUEST](state) {
    // TODO
    return null;
  },

  [types.LOGIN_SUCCESS](state, { response }) {
    // TODO
    return null;
  },

  [types.LOGIN_FAILURE](state, { error }) {
    // TODO
  },
};

export default {
  actions,
  mutations,
  state: { jwt: null },
};
