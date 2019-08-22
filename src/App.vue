<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          @click="logout"
          v-if="loggedIn"
        >
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Exit</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link tag="span" to="/">
          Ad Application
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text
          v-for="link in links"
          :key="link.title"
          :to="link.url"
        >
          <v-icon left>{{ link.icon }}</v-icon>
            {{ link.title }}
          </v-btn>

          <v-btn text
            @click="logout"
            v-if="loggedIn"
          >
          <v-icon left>mdi-exit-to-app</v-icon>
            Exit
          </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
        <router-view></router-view>
    </v-content>

      <template v-if="error">
        <v-snackbar
        :color="'error'"
        :multi-line="'multi-line'"
        :value='true'
      >
        {{ error }}
        <v-btn
          dark
          text
          @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
      </template>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    loggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if ( this.loggedIn ) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark', url: '/orders' },
          { title: 'New Ad', icon: 'mdi-note', url: '/new' },
          { title: 'My Ads', icon: 'mdi-file-document-box', url: '/list' },
        ]
      }

      return [
        { title: 'Login', icon: 'mdi-lock', url: '/login' },
        { title: 'Registration', icon: 'mdi-face', url: '/registration' },
      ]
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          if (this.$route.name !== 'home') {
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

<style scoped>
  span{
    cursor: pointer;
  }
</style>
