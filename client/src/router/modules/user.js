import dashboard from '@/views/user/dashboard.vue'

const user_routes = [
    {
        path: '/dashboard', 
        name: 'dashboard', 
        component: dashboard, 
        meta: { title: 'Dashboard', auth: true }
    },
]

export default user_routes