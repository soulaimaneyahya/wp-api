<script setup>
// Imports
import { RouterView } from 'vue-router'
import navbar from './components/nav.vue'
</script>

<template>
<div>
  <nav-bar></nav-bar>
  <div class="container my-3">
    <!-- Dynamic -->
    <RouterView />
  </div>
</div>
  
</template>

<script>
export default {
  components: {
    'nav-bar': navbar
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
