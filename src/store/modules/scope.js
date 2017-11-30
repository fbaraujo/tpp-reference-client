import Vue from 'vue';
import { CHANGE_SCOPE } from '../mutation-types';

const initialState = {
  scope: null,
};

const getters = {
  currentScope: state => () => state.scope,
};

const mutations = {
  [CHANGE_SCOPE](state, newScope) {
    Vue.set(state, 'scope', newScope);
  },
};

const actions = {
  changeScope({ commit }, newScope) {
    return commit(CHANGE_SCOPE, newScope);
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
