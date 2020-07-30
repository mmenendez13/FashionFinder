import dashboard from '@/views/user/dashboard.vue'

const user_routes = [
        {
            path: '/dashboard', 
            name: 'dashboard', 
        component: dashboard, 
        meta: { title: 'Dashboard', auth: true }
        },
        // {
 //                path: '/streams', 
 //                name: 'streams', 
 //                component: streams, 
 //                meta: { title: 'Streams', auth: true}
        // },
]

export default user_routes