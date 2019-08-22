<template>
  <v-container>
    <template v-if="loading">
      <v-layout>
          <v-flex xs12 class="text-center pt-5">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout>
      <v-flex xs12>
        <h1 class="text--secondary mb-5">Ad</h1>

        <v-card
          class="elevation-10"
        >
          <v-img
            :src="ad.imgSrc"
            height="300"
          >
          </v-img>
          <v-card-text>
            <h2>{{ ad.title }}</h2>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit-ad :ad="ad" v-if="isOwner"></app-edit-ad>
            <app-modal-buy v-if="!isOwner" class="ml-2" :ad="ad"></app-modal-buy>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    </template>
  </v-container>
</template>

<script>
import editAd from './editAd.vue';

export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id;

      return this.$store.getters.adById(id);
    },
    loading () {
      return this.$store.getters.loading
    },
    
    isOwner () {
      if ( this.$store.getters.user === null ) {
        return false
      }

      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    appEditAd: editAd
  }
}
</script>

<style scoped>
p{
  margin-bottom: 0;
  margin-top: 5px;
}

</style>
