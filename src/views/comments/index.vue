<template>
  <div>
    <div class="card my-3">
        <div class="card-header">
            <h5 class="my-0 p-0">Comments</h5>
        </div>
        <div class="card-body">
            <div v-if="loading">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <ul v-else class="list-group">
                <div v-if="comments.length">
                    <li v-for="(item, index) in comments" :key="index" class="list-group-item" v-html="item.content.rendered"></li>
                </div>
                <div v-else>
                    <li class="list-group-item">No Comments Yet</li>
                </div>
            </ul>
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
            comments: []
        }
    },
    methods: {
        getComments() {
            this.loading = true
            return setTimeout(() => 
                axios.get(`${this.url}/index.php/wp-json/wp/v2/comments`)
                .then( response => {
                    let data = response.data
                    data.forEach((comment, i) => {
                        if (comment.post == this.id) {
                            // this.comments[i] = comment
                            this.comments.push(comment)
                        }
                    });
                    this.loading = false
                })
                .catch( error => console.log(error))
            , 300);
        }
    },
    created() {
        this.getComments()
    }
}
</script>
