import { createRouter, createWebHistory } from 'vue-router'

import show from '../views/posts/show.vue'
import create from '../views/posts/create.vue'
import home from '../views/index.vue'
import edit from '../views/posts/edit.vue'

// not found
import notFound from '../views/errors/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    // Posts
    {
      path: '/posts',
      name: 'posts.index',
      component: () => import('../views/posts/index.vue')
    },
    {
      path: '/post/:id',
      name: 'posts.show',
      component: show,
      props:true
    },
    {
      path: '/post/:id/edit',
      name: 'posts.edit',
      component: edit,
      props:true
    },
    {
      path: '/posts/create',
      name: 'posts.create',
      component: create,
      props:true
    },
    // Users
    {
      path: '/users',
      name: 'users.index',
      component: () => import('../views/users/index.vue')
    },
    // catch all 404
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: notFound
    }
  ]
})

export default router
