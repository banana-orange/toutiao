import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import home from '../views/home/index.vue'
import home2 from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  { path: '/home',
    component: home,
    children: [
      {
        path: '',
        component: home2
      },
      {
        path: 'comment',
        component: () => import('../views/comment')
      },
      {
        path: 'material',
        component: () => import('../views/material')
      },
      {
        path: 'articles',
        component: () => import('../views/articles')
      },
      {
        path: 'publish',
        component: () => import('../views/publish')
      }
    ] }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
