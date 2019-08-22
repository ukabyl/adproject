<template>
  <v-dialog v-model="modal" persistent width="500">
    <template v-slot:activator="{ on }">
      <v-btn class="primary" dark v-on="on">Buy</v-btn>
    </template>  

    <v-card>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-card-title class="mb-2">
              <h1 class="text--primary">Wanna you buy it? <br>Fill in the form please.</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                label="Your name"
                name="name"
                v-model="name"
                type="text"
              ></v-text-field>
              <v-text-field
                label="Your phone"
                name="phone"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-actions class="mt-2">
              <v-spacer></v-spacer>
              <v-btn @click="onCancel" class="default" :disabled="localLoading">Cancel</v-btn>
              <v-btn @click="onOrder" class="primary" :disabled="onFilledIn || localLoading" :loading="localLoading">Buy</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  computed: {
    onFilledIn () {
      if  ( (this.title !== '' && this.phone !== '') ) {
        return false
      } else return true;
    }
  },
  methods: {
    onCancel () {
      this.name = '';
      this.phone = '';
      
      this.modal = false;
    },
    onOrder () {
      this.localLoading = true;

      this.$store.dispatch('addOrder', {
        name: this.name,
        phone: this.phone,
        adId: this.ad.id,
        ownerId: this.ad.ownerId
      })
      .finally(() => {
        this.name = '';
        this.phone = '';
        this.localLoading = false;
        this.modal = false;
      })
    }
  }
}
</script>

<style scoped>
  h1{
    font-size: 2rem;
    line-height: 2rem;
  }
</style>