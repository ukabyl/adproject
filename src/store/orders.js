import * as fb from 'firebase'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name;
    this.phone = phone;
    this.adId = adId;
    this.done = done;
    this.id = id;
  }
}

export default {
  state: {
    orders: [] 
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload;
    }
  },
  actions: {
    async addOrder ({commit}, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId)
      commit('clearError')

      try {
        await fb.database().ref(`users/${ownerId}/orders`).push(order)
      } catch (err) {
        commit('setError', err.message)
        throw err;
      }

    },
    async fetchOrders ({commit, getters}) {
      commit('clearError')
      commit('setLoading', true)

      const resultOrders = [];
      try {

        const fbVal = await fb.database().ref(`users/${getters.user.id}/orders`).once('value')
        
        const fetchedOrders = fbVal.val()

        if ( !fetchedOrders ) {
          commit('setLoading', false)
          return
        }
        
        Object.keys(fetchedOrders).forEach(key => {
          const o = fetchedOrders[key];

          resultOrders.push(
            new Order(o.name, o.phone, o.adId, o.done, key)
          )
        })

        commit('loadOrders', resultOrders)

        commit('setLoading', false)
      } catch (err) {
        commit('setError', err.message)
        commit('setLoading', false)
        throw err;
      }
    },
    async markOrderDone ({commit, getters}, payload) {
      commit('clearError')
      try{

        await fb.database().ref(`users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })

      } catch (err) {
        commit('setError', err.message)
        throw err;
      }
    },
    async markOrderUndone ({commit, getters}, payload) {
      commit('clearError')
      try{

        await fb.database().ref(`users/${getters.user.id}/orders`).child(payload).update({
          done: false
        })

      } catch (err) {
        commit('setError', err.message)
        throw err;
      }
  },
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(o => o.done)
    },
    undoneOrders (state) {
      return state.orders.filter(o => !o.done)
    },
    orders (state, getters) {
      return getters.doneOrders.concat(getters.undoneOrders)
    }
  }
}