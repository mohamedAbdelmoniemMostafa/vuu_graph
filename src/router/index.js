import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'
import UserDetails from '../views/UserDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/user/:id',
      name: 'user-details',
      component: UserDetails
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
