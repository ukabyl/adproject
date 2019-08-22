import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import ads from './ads'
import user from './user'
import shared from './shared'
import orders from './orders'

export default new Vuex.Store({
  modules: {
    ads,
    user,
    shared,
    orders
  }
})