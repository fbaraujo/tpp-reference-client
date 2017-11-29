import Vue from 'vue';
import { SELECT_ACTIVITY } from '../mutation-types';

const initialState = {
  selectedActivity: null,
};

const getters = {
  selectedActivity: state => () => { // eslint-disable-line
    return state.selectedActivity;
  },
};

const mutations = {
  [SELECT_ACTIVITY](state, activity) {
    Vue.set(state, 'selectedActivity', activity);
  },
};

const actions = {
  selectActivity({ commit }, activity) {
    return commit(SELECT_ACTIVITY, activity);
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
