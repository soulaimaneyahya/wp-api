<template>
    <div>
        <h3>Edit Post</h3>
        <div class="py-2">
            <div class="card">
                <div class="card-body">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="title" placeholder="Title .." v-model="post.title">
                    </div>
                    <div class="mb-3">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a content here" id="content" v-model="post.content" style="height: 100px"></textarea>
                            <label for="content">Content</label>
                        </div>
                    </div>
                    <select class="form-select" v-model="post.status">
                        <option :value="item" v-for="(item, index) in status" :key="index">{{ item }}</option>
                    </select>
                    <button class="btn btn-dark btn-sm my-3 fw-bold text-uppercase"
                    @click.prevent="update"
                    :disabled="sending"
                    >Update</button>
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
            status: [
                'publish',
                'draft',
                'pending'
            ],
            post: {
                title: null,
                content: null,
                status: "publish"
            },
            sending: false,
            success: false
        }
    },
    methods: {
        getPost() {
        return setTimeout(() => 
            axios.get(`${this.url}/index.php/wp-json/wp/v2/posts/${this.id}`)
            .then( response => {
            
            this.post.title = response.data.title.rendered
            this.post.content = response.data.content.rendered
            this.post.status = response.data.status

            this.loading = false
            })
            .catch( error => console.log(error))
        , 300);
        },
        update() {
            this.sending= true
            let token = "your-unique-token"
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios
            .put(`${this.url}/index.php/wp-json/wp/v2/posts/${this.id}`, this.post, config)
            .then((response) => {
                this.$router.push({ name: 'posts.index' })
            })
            .catch(err => {
                console.log(err.message)
            })
            .then(() => (this.sending = false));
        }
    },
    created() {
        this.getPost()
    }
}
</script>

<style></style>
