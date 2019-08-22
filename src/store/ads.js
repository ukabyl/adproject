import * as fb from "firebase";

class Ad {
  constructor (title, description, promo = false, imgSrc, ownerId, id = null) {
    this.title = title;
    this.description = description;
    this.promo = promo;
    this.imgSrc = imgSrc;
    this.ownerId = ownerId;
    this.id = id;
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload;
    },
    updateAd(state, {title, description, id}) {
      const ad = state.ads.find(a => {
        return a.id === id;
      })

      ad.title = title;
      ad.description = description;
    }
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image;

      try{

        const newAd = new Ad (
          payload.title, 
          payload.desc, 
          payload.promo,
          '',
          getters.user.id
          )

          const fbVal = await fb.database().ref('ads').push(newAd);
          const imageExt = image.name.slice(image.name.lastIndexOf('.'))

          const fileData = await fb.storage().ref(`ads/${fbVal.key}.${imageExt}`).put(image);
          const imgSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()

          await fb.database().ref('ads').child(fbVal.key).update({
            imgSrc
          })

          commit('setLoading', false)
          commit('createAd', {
            ...newAd,
            id: fbVal.key,
            imgSrc
          })
      } catch (err) {
        commit('setError', err.message)
        commit('setLoading', false)
        throw err
      }
    },

    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const reusltAds = [];

      try {

        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()
        
        Object.keys(ads).forEach(key => {
          const ad = ads[key]

          reusltAds.push(
            new Ad(
              ad.title,
              ad.description, 
              ad.promo, 
              ad.imgSrc, 
              ad.ownerId, 
              key
            )
          )
        })

        commit('loadAds', reusltAds)

        commit('setLoading', false)
      } catch (err) {
        commit('setError', err.message)
        commit('setLoading', false)
        throw err;
      }
    },

    async updateAd ({commit}, {title, description, id}) {
      commit('setLoading', true)
      commit('clearError')
  
      try {

        await fb.database().ref('ads').child(id).update({
          title, description
        })

        commit('updateAd', {
          title, description, id
        })

        commit('setLoading', false)
      } catch (err) {
        commit('setError', err.message)
        commit('setLoading', false)
        throw err;
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state, getters) {
      if ( getters.user === null ) {
        return []
      }
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id;
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId);
      }
    }
  }
}