import * as fb from 'firebase'

class User {
  constructor (id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async registerUser ( { commit }, { password, email } ) {

      commit('clearError')
      commit('setLoading', true)

      try {
          const user = await fb.auth().createUserWithEmailAndPassword(email, password)
          commit('setUser', new User(user.user.uid));
          commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        commit('setError', err.message)
        throw err
      }

    },
    
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        commit('setError', err.message)
        throw err
      }
    },

    autoLogin ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },

    logout ({commit}) {
      fb.auth().signOut();
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}