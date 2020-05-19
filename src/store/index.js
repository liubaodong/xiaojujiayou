import createPersistedState from "vuex-persistedstate"

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openId: '',
    params: {}
  },
  // plugins: [createPersistedState({ storage: window.sessionStorage })],

  mutations: {
    getParams(state, payload){
      Object.assign(state.params, payload)
      console.log('state', state.params)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    PARAMS: state => state.params
  }
})
