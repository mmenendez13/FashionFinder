import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

import auth from './modules/auth'
// import socket from './modules/socket'

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state: {
        streams: {},
        socket: {
            isConnected: false,
            reconnectError: false,
        }
    },
    mutations:{
        SOCKET_ONOPEN (state, event)    {
            Vue.prototype.$socket = event.currentTarget
            state.socket.isConnected = true
        },
        SOCKET_ONCLOSE (state, event)    {
            console.log(event)
            state.socket.isConnected = false
            state.streams = {}
        },
        SOCKET_ONERROR (state, event)    {
            console.error(state, event)
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE (state, message)    {
            try {
                let {ipAddress, ...rest} = JSON.parse(message.data)
                console.log(message)
                switch(rest.type){
                    case 'connect':
                        // rest.values = []
                        // Vue.set(state.streams, ipAddress, rest)
                        break;
                    case 'disconnect':
                        delete state.streams[ipAddress]
                        break;
                    case 'client':
                        if(typeof state.streams[ipAddress] != 'undefined'){
                            state.streams[ipAddress].name = rest.name
                                state.streams[ipAddress].values.push(rest.message)
                                if(state.streams[ipAddress].values.length>100){
                                    state.streams[ipAddress].values.shift()
                                }
                            
                        } else {
                            rest.values = []
                            Vue.set(state.streams, ipAddress, rest)
                        }
                        break;
                }
            } catch(e) {
                console.log(e)
            }
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info(state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
    },
    actions: {
        sendMessage: function(context, message) {
            Vue.prototype.$socket.send(message)
        }
    },
    modules: {
            auth,
    },
    strict: debug,
    plugins: [createPersist({
        namespace: 'autoroom',
        initialState: {},
        expires: 7 * 24 * 60 * 60 * 1e3 //Week in ms
    })]
})

export default store