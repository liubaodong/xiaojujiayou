import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    openId: '',
    params: {}
  },
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
