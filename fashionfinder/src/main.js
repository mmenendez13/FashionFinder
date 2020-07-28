import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Auth from '@aws-amplify/auth'
import configuration from '@/configuration.js'
import BootstrapVue from 'bootstrap-vue'
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://localhost:5000/', {store: store})

Auth.configure(configuration.auth)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App),
}).$mount('#app')
