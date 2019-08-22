<template>
  <v-container>
    <v-layout justify-center class="mb-2">
      <v-flex xs12 sm6>
        <h1 class="text--secondary mb-3">New Ad</h1>

        <v-form v-model="valid" ref="form" validation class="mb-5">
          <v-text-field
            label="Title"
            name="title"
            type="text"
            v-model="title"
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>

          <v-textarea
            label="Description"
            name="Description"
            v-model="description"
            type="text"
            multi-line
            :rules="[v => !!v || 'Description is required']"
          ></v-textarea>
          </v-form>

          <v-btn @click="openImageUploader" class="warning">Upload<v-icon right flat>mdi-upload</v-icon></v-btn>
          <v-btn @click="clearImage" class="error ml-2" v-if="imageSrc">Cancel</v-btn>
          <input @change="uploadImage" ref="imageUploader" type="file" accept="image/*" hidden>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm6 lg3>
        <img :src="imageSrc" v-if="imageSrc">
      </v-flex>  
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-switch v-model="promo" class="ma-2" label="Add to promo?"></v-switch>
      </v-flex>  
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm6 lg3>
        <v-btn class="primary" @click="createAd" :disabled="!valid || !imageSrc || loading" :loading="loading">Create Ad</v-btn>
      </v-flex>  
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      description: '',
      title: '',
      promo: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if ( this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          desc: this.description,
          promo: this.promo,
          image: this.image
        }

        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }  
    },
    openImageUploader () {
      this.$refs.imageUploader.click()
    },
    uploadImage (event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file

    },
    clearImage () {
      this.image = null;
      this.imageSrc = '';
    }
  }
}
</script>

<style scoped>
img{
  width: 100%
}
</style>
