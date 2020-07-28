import signIn from '@/views/auth/signIn.vue'
import signUp from '@/views/auth/signUp.vue'
import signOut from '@/views/auth/signOut.vue'
import passwordReset from '@/views/auth/passwordReset.vue'
import changePassword from '@/views/auth/changePassword.vue'


const auth_routes = [
  {
    path: '/signIn', 
    name: 'signIn', 
    component: signIn, 
    meta: { title: 'Sign In', auth: false }
  },
  {
    path: '/signOut', 
    name: 'signOut', 
    component: signOut, 
    meta: { title: 'Sign Out', auth: true }
  },
  {
    path: '/signUp', 
    name: 'signUp', 
    component: signUp, 
    meta: { title: 'Sign Up', auth: false }
  },
  {
    path: '/changePassword', 
    name: 'changePassword', 
    component: changePassword, 
    meta: { title: 'Change Password', auth: true }
  },
  {
    path: '/passwordReset', 
    name: 'passwordReset', 
    component: passwordReset, 
    meta: { title: 'Password Reset', auth: false }
  },
]

export default auth_routes