<template>
  <v-dialog v-model="modal" persistent width="500">
    <template v-slot:activator="{ on }">
      <v-btn class="warning" v-on="on">Edit</v-btn>
    </template>  

    <v-card>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-card-title class="mb-2">
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                label="Title"
                name="title"
                v-model="editedTitle"
                type="text"
              ></v-text-field>
              <v-textarea
                label="Description"
                name="description"
                v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-actions class="mt-2">
              <v-spacer></v-spacer>
              <v-btn @click="onCancel" class="default">Cancel</v-btn>
              <v-btn @click="onSave" class="primary" :disabled="onEdited">Save</v-btn>
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
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },
  computed: {
    onEdited () {
      if  ( (this.editedTitle !== this.ad.title || this.editedDescription !== this.ad.description)
                &&
            (this.editedTitle !== '' && this.editedDescription !== '')
          ) {
        return false
      }

      return true
    }
  },
  methods: {
    onCancel () {
      this.editedTitle = this.ad.title;
      this.editedDescription = this.ad.description;

      this.modal = false;
    },
    onSave () {
      this.$store.dispatch('updateAd', {
        title: this.editedTitle,
        description: this.editedDescription,
        id: this.ad.id
      })
    }
  }
}
</script>

<style scoped>
  textarea{
    line-height: 1.2rem;
  }
</style>