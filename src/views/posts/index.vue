<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class="py-3">

      <div class="d-flex justify-content-start align-items-center">
        <h3>Posts</h3>
        <RouterLink class="btn btn-sm btn-outline-dark mx-2" :to="{name: 'posts.create'}">Add New</RouterLink>
      </div>

      <tabs :countAll="countAll" />

      <div v-if="loading" class="mt-4">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else class="border-bottom py-0 my-4" v-for="(post, index) in posts" :key="index">
        <h4 class="m-0 p-0">{{ titleText(ucwords(post.title.rendered)) }}</h4>
        <div class="my-1">
          <p class="m-0 p-0">
            {{ contentText(post.content.rendered) }} 
            <RouterLink :to="{name: 'posts.show', params:{id: post.id}}" style="font-size:13px">
              Read More
            </RouterLink>
          </p>
          <ul class="list-unstyled d-flex justify-content-between align-items-center my-0 py-0">
            <div class="d-flex">
              <li>
                <i class="bi bi-calendar"></i>
                Added At {{ moment(post.date ).fromNow() }}
              </li>
              <li class="mx-4">
                <i class="bi bi-stickies"></i>
                {{ post.status }}
              </li>
            </div>
            <li>
                {{ post.author }}
                <i class="bi bi-person-fill"></i>
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-start align-items-center">
          <RouterLink class="btn btn-sm btn-dark" :to="{name: 'posts.edit', params:{id: post.id}}" style="font-size:13px">
            <i class="bi bi-pen"></i>
          </RouterLink>

          <!-- Button trigger modal -->
          <button type="button" class="btn btn-danger btn-sm mx-2" data-bs-toggle="modal"
          :data-bs-target="`#modal-post-${post.id}`"
          >
            <i class="bi bi-trash"></i>
          </button>
          <!-- Modal -->
          <div class="modal fade" :id="`modal-post-${post.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Delete Post</h5>
                  <button 
                  type="button" class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Are You Sure You want to Delete this Post ?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-secondary" :data-id="post.id" @click="deleteModal($event)">Delete</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from "moment"
import tabs from '../../components/tabs.vue'

export default {
  components: {
    tabs
  },
  data() {
    return {
      url: "your-wp-route",
      loading: false,
      posts: [],
      countAll: null
    }
  },
  methods: {
    titleText(title) {
      return `${title.substring(0, 95)}`
    },
    contentText(content) {
      let str = content.replace(/<[^>]*>?/gm, '')
      return `${str.substring(0, 200)}...`
    },
    ucwords(str) {
      return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
      });
    },
    getInfos() {
      return setTimeout(() => 
        axios.get(`${this.url}/index.php/wp-json/wp/v2/posts`)
        .then( response => {
          this.posts = response.data

          this.posts.forEach((post) => {
            axios.get(`${post._links['author'][0].href}`)
            .then( response => {
              post.author = response.data.name
            })
            .catch( error => console.log(error))
          })

          this.loading = false
          this.countAll = this.posts.length
        })
        .catch( error => console.log(error))
    , 300);
    },
    deleteModal(e) {
      let id = e.target.dataset.id
      
      let token = "your-unique-token"

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      axios.delete(`${this.url}/index.php/wp-json/wp/v2/posts/${id}`, config)
      .then( response => {
        $(`#modal-post-${id}`).modal('hide');
        this.getInfos()
      })
      .catch( error => console.log(error))
    }
  },
  created() {
    this.loading = true;
    this.getInfos()
  },
}
</script>

<style></style>
