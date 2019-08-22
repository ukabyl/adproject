<template>
  <v-container>
    <v-layout justify-center="">
      <v-flex xs12 v-if="loading" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-flex>
      <v-flex xs12 md6 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary">Orders</h1>
        <v-list
      subheader
      two-line
      flat
    >
      <v-list-item-group
        class="mt-5"
        multiple
      >
        <v-list-item
          v-for="order in orders"
          :key="order.id"
        >
          <template>
            <v-list-item-action>
              <v-checkbox
                color="primary"
                :input-value="order.done"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-btn :to="'/ad/'+order.adId" class="primary">Open</v-btn>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
      </v-flex>
      <v-flex xs12 v-else class="text-center">
        <h1 class="text--secondary">You don't have any orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  },
  methods: {
    markDone (order) {
      if ( !order.done ) {
        this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
      } else {
        this.$store.dispatch('markOrderUndone', order.id)
        .then(() => {
          order.done = false
        })
        .catch(() => {})
      }
    }
  }

}
</script>

<style>

</style>
