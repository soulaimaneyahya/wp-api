<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <ul class="nav nav-tabs my-3">
        <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" :to="{name: 'posts.index'}">Published ({{ countAll }})</RouterLink>
        </li>
    </ul>
</template>

<script>
export default {
    props:['countAll']
}
</script>

<style></style>
