<template>
  <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="5"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Registration form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" validation>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="email"
                    :rules='emailRules'
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    counter="6"
                    :rules="passwordRules"
                  ></v-text-field>

                  <v-text-field
                    id="confirmId"
                    label="confirmPassword"
                    name="confirmPassword"
                    v-model="confirmPassword"
                    prepend-icon="mdi-lock"
                    type="confirmPassword"
                    counter="6"
                    :rules="confirmPasswordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                  @click="onSubmit"
                  :loading="loading"
                  :disabled="!valid || loading"
                >Create Account</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      confirmPassword: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => !!v && v.length >= 6 || 'Password must be equal or more than 6'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => !!v && v === this.password || 'Password should match'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
        
      }
    }
  }
}
</script>

<style>

</style>
