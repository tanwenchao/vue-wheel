import Vue from 'vue'
import Vuex from 'vuex'
import scroll from './modules/scroll'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    scroll
  },
  strict: debug
})
