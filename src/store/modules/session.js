import Vue from 'vue';

import {
  RECEIVE_SESSION,
} from '../mutation-types';

const initialState = {
  sid: null,
};

const mutations = {
  [RECEIVE_SESSION](state, payload) {
    Vue.set(state, 'sid', payload.sid);
  },
};

export default {
  state: initialState,
  mutations,
};
