import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openId: ''
  },
  mutations: {
    getOpenId(state, payload){
      state.openId = payload
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    OPEN_ID: state => state.openId
  }
})
