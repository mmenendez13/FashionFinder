import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home', 
    component: home, 
    meta: { title: 'Home', auth: false}
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new Router({ mode: "history", routes })

export default router