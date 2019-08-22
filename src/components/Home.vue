<template>
<div>
    <v-container fluid>
      <template v-if="!loading">
        <v-layout>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.imgSrc"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
            <div class="car-link">
              <v-btn class="error" :to="'/ad/'+ ad.id">{{ ad.title }}</v-btn>
            </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
      </template>
      
      <template v-else>
        <v-container>
          <v-layout>
            <v-flex xs12 class="text-center pt-5">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-flex>
        </v-layout>
        </v-container>
      </template>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          xs12
          md6
          lg4
          v-for="ad in promoAds"
          :key="ad.id"
        >
          <v-card
            class="mx-auto"
            flat
          >
            <v-img
              class="white--text"
              height="200px"
              :src="ad.imgSrc"
            >
              <v-card-title class="align-end fill-height" style="text-shadow: 0 0 3px #000;">{{ ad.title }}</v-card-title>
            </v-img>

            <v-card-text>{{ ad.desc }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text class="error">
                <router-link tag="span" :to="'/ad/' + ad.id">Open</router-link>
              </v-btn>
              <app-modal-buy v-if="!isOwner(ad)" class="ml-2" :ad="ad"></app-modal-buy>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    loading () {
      return this.$store.getters.loading
    },
  },
  methods: {
    isOwner (ad) {
      
      if ( this.$store.getters.user === null ) {
        return false
      }

      return ad.ownerId === this.$store.getters.user.id
    }
  }
}
</script>

<style scroped>
  .car-link{
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0,0,0,.3);
    transform: translate(-50%, 0);
    padding: 10px 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>
