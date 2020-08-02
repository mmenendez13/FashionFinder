import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home.vue'
import notFound from '@/views/404.vue'
import store from '@/store'
import auth_routes from './modules/auth.js'
import user_routes from './modules/user.js'

Vue.use(Router)

const base_routes = [
    {
        path: '/',
        name: 'home', 
        component: home, 
        meta: { title: 'Home', auth: false}
    },
    {
        path: '/404',
        name: '404',
        component: notFound,
        meta: { title: '404: Page not found'}
    },
    {
        path: '*',
        redirect: '/404'
    }
]


const routes = base_routes.concat(auth_routes).concat(user_routes)

const router = new Router({ mode: "history", routes })

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    if (to.meta && to.meta.auth !== undefined) {
        if (to.meta.auth) {
            if (store.getters['auth/isAuthenticated']) {
                next()
                return
            }
            router.push({ name: 'signIn' })
            return
        }
        if (store.getters['auth/isAuthenticated']) {
            router.push({ name: 'dashboard' })
            return
        }
        next()
        return
    }
    next()
    return
})

export default router
