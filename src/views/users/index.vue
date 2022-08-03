<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class="py-3">

      <div class="d-flex justify-content-start align-items-center">
        <h3>Users ({{ countAll }})</h3>
      </div>

      <div v-if="loading" class="mt-4">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else class="border-bottom py-0 my-4" v-for="(user, index) in users" :key="index">
        <img :src="user.avatar_urls['48']" class="img-thumbnail"/>
        <div>
          <h4 class="m-0 p-0">{{ titleText(ucwords(user.name)) }}</h4>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      url: "your-wp-route",
      loading: false,
      users: [],
      countAll: null
    }
  },
  methods: {
    titleText(title) {
      return `${title.substring(0, 95)}`
    },
    ucwords(str) {
      return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
      });
    },
    getUsers() {
      return setTimeout(() => 
        axios.get(`${this.url}/index.php/wp-json/wp/v2/users`)
        .then( response => {
          this.users = response.data
          this.loading = false
          this.countAll = this.users.length
        })
        .catch( error => console.log(error))
    , 300);
    }
  },
  created() {
    this.loading = true;
    this.getUsers()
  },
}
</script>

<style></style>
