<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" :to="{name: 'home'}">WP API</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <RouterLink class="nav-link" :to="{name: 'posts.index'}" role="button">
                        Posts
                    </RouterLink>
                </li>
                <li class="nav-item dropdown">
                    <RouterLink class="nav-link" :to="{name: 'users.index'}" role="button">
                        Users
                    </RouterLink>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>
