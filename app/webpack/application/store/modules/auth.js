import axios from 'axios';
import * as types from '../types';

import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

const actions = {
  async login({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post('/auth', params);
        commit(types.JWT_RESET);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });

  },

  async signup({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post('/user', params);
        commit(types.JWT_RESET);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  logout({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete('/auth');
        commit(types.JWT_RESET);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
};

const getters = {
  authenticated: (state) => state.jwt,
  name: (state) => jwt(state).name,
};

const mutations = {
  [types.JWT_RESET](state) {
    state.jwt = Cookies.get('jwt');
  },
};

export default {
  actions,
  getters,
  mutations,
  state: { jwt: Cookies.get('jwt') },
};
