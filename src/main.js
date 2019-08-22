import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes'
import * as fb from 'firebase'

import store from './store'

import AppModalBuy from './components/OpenModalBuy'

Vue.component('app-modal-buy', AppModalBuy)


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store,
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyBHs9yGwzUUhtczctPHFBzZKXpiQGl6Sxc',
      authDomain: 'ads-vue-project.firebaseapp.com',
      databaseURL: 'https://ads-vue-project-69d6a.firebaseio.com',
      projectId: 'ads-vue-project',
      storageBucket: 'ads-vue-project-69d6a.appspot.com',
      messagingSenderId: '531657238349'
    })

    fb.auth().onAuthStateChanged(user => {
      if ( user ) {
        this.$store.dispatch('autoLogin', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
