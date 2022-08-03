<template>
  <div>
    <div v-if="loading" class="mt-4">
      <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <h3>Post #{{ id }}</h3>
      <div class="py-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ post.title.rendered }}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><i class="bi bi-person-fill"></i> {{ post.author }}</h6>
                <p class="card-text" v-html="post.content.rendered"></p>
                <ul class="list-unstyled d-flex my-0">
                  <li>
                    <i class="bi bi-stickies me-2"></i>{{ post.status }}
                  </li>
                  <li class="mx-4">
                    <i class="bi bi-calendar me-2"></i> Added At {{ post.date }}
                  </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data() {
    return {
      url: "your-wp-route",
      loading: false,
      post: []
    }
  },
  methods: {
    getPost() {
      return setTimeout(() => 
        axios.get(`${this.url}/index.php/wp-json/wp/v2/posts/${this.id}`)
        .then( response => {
          this.post = response.data

          axios.get(`${this.post._links['author'][0].href}`)
          .then( response => {
            this.post.author = response.data.name
          })
          .catch( error => console.log(error))

          this.loading = false
        })
        .catch( error => console.log(error))
    , 300);
    }
  },
  created() {
    this.loading = true;
    this.getPost()
  },
}
</script>

<style></style>
