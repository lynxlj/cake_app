import Vue from 'vue';
import vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

Vue.use(vuex);

const syncStorage = store => store.subscribe((mutation, sta) => {
  if (mutation.type === 'storageUserinfo') {
    window.localStorage.setItem('user-token', JSON.stringify(sta.userinfo));
  }
  window.localStorage.setItem('ih-cart', JSON.stringify(sta.cart));
  window.localStorage.setItem('ih-search', JSON.stringify(sta.searchHistory));
});

export default new vuex.Store({
  state,
  mutations,
  getters,
  plugins: [syncStorage],
  actions,
});
