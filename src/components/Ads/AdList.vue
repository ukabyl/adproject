<template>
  <v-container>
    <template v-if="!loading && myAds.length !== 0">
      <v-layout justify-center>
      <v-flex xs12 sm6>
        <h1 class="text--secondary mb-5">Ad List</h1>

          <v-card class="elevation-10 mb-5"
            v-for="card in myAds"
            :key="card.id"
          >
          <v-layout>
            <v-flex xs5>
            <v-img
              :src="card.imgSrc"
              height="160"
            >
            </v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-text>
              <h2>{{ card.title }}</h2>
              <p>{{  card.desc }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary" :to="'/ad/'+ card.id">Open</v-btn> 
            </v-card-actions>
          </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    </template>
    <template v-else-if="!loading && myAds == 0">
      <h1 class="text-center">Sorry, but you don't have any ads</h1>
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
</template>

<script>
export default {
  computed: {
    myAds () {
      return this.$store.getters.myAds
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style>

</style>
