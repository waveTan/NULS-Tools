import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    height: 0, //最新高度
    accountInfo: {},
  },
  mutations: {
    setHeight(state, data) {
      state.height = data;
      sessionStorage.setItem('height', JSON.stringify(data));
    },
    changeAccount(state, accountInfo) {
      accountInfo = accountInfo || {address: ""};
      state.accountInfo = accountInfo;
    },
  },
  getters: {
    getHeight(state) {
      state.height = sessionStorage.hasOwnProperty('height') ? JSON.parse(sessionStorage.getItem('height')) : 0;
      sessionStorage.setItem('height', JSON.stringify(state.height));
      return state.height
    }
  },
  actions: {}
})
