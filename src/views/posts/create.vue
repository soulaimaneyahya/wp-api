<template>
    <div>
        <h3>Create Post</h3>
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
                    @click.prevent="submit"
                    :disabled="sending"
                    >Submit</button>
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
        submit() {
            this.sending= true
            let token = "your-unique-token"
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios
            .post(`${this.url}/index.php/wp-json/wp/v2/posts`, this.post, config)
            .then((response) => {
                this.$router.push({ name: 'posts.index' })
            })
            .catch(err => {
                console.log(err.message)
            })
            .then(() => (this.sending = false));
        }
    }
}
</script>

<style></style>
