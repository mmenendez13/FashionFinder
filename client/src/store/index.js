import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

import auth from './modules/auth'
import user from './modules/user'
// import socket from './modules/socket'

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state: {},
    modules: {
            auth,
            user
    },
    strict: debug,
    plugins: [createPersist({
        namespace: 'fashionfinder',
        initialState: {},
        expires: 7 * 24 * 60 * 60 * 1e3 //Week in ms
    })]
})

export default store