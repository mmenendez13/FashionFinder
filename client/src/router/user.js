import dashboard from '@/views/user/dashboard.vue'
import myItems from '@/views/user/myItems.vue'

const user_routes = [
        {
            path: '/dashboard', 
            name: 'dashboard', 
        component: dashboard, 
        meta: { title: 'Dashboard', auth: true }
        },
        {
            path: '/myItems', 
            name: 'items', 
            component: myItems, 
            meta: { title: 'myItems', auth: true}
        },
]

export default user_routes