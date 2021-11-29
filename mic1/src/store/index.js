import Vue from 'vue'
import Vuex from 'vuex'
const { name:appName } = require('../../package.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      appName
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
