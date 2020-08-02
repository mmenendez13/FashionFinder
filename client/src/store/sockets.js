
// initial state
const state = {
    user: null,
    userId: null,
    isAuthenticated: false,
}

const getters = {
    authenticatedUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    authenticationStatus: state => {
        return state.authenticationStatus
        ? state.authenticationStatus
        : { variant: "secondary" }
    },
    hasAuthenticationStatus: state => {
        return state.authenticationStatus == null
    }
}

const mutations = {
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
    }
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
        console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
        state.socket.reconnectError = true;
    },
};

const actions = {
    sendMessage: function(context, message) {
        Vue.prototype.$socket.send(message)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}