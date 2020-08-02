import Auth from "@aws-amplify/auth"
import Amplify from "@aws-amplify/core"
import axios from 'axios'

const Logger = Amplify.Logger
Logger.LOG_LEVEL = "DEBUG" // to show detailed logs from Amplify library
const logger = new Logger("store:auth")

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
    setAuthenticationError(state, err) {
        logger.debug('auth error: {}', err)
        switch(err.name){
            case 'UserLambdaValidationException':
                err.message = 'Verification failed.'
                break
        }
        state.authenticationStatus = {
            state: 'failed', message: err.message, variant: 'danger',
        }
    },
    clearAuthenticationStatus: (state) => {
        state.authenticationStatus = null
    },
    setUserAuthenticated(state, user) {
        state.user = user
        state.userId = user.attributes.sub
        state.isAuthenticated = true
    },
    clearAuthentication(state) {
        state.user = null
        state.userId = null
        state.isAuthenticated = false
    },
}

const actions = {
    clearAuthenticationStatus: (context) => {
        context.commit('clearAuthenticationStatus', null)
    },
    signIn: async (context, params) => {
        logger.debug('signIn for {}', params.username)
        context.commit('auth/clearAuthenticationStatus', null, { root: true })
        try {
            const user = await Auth.signIn(params.username, params.password)
            context.commit('setUserAuthenticated', user)

            let userParams = {            
                userId: user.userId,
                email: user.attributes.email,
                name: user.attributes.name
            };
            
            axios.post("http://127.0.0.1:4000/signIn",userParams)
                .then(response => {
                    console.log(response)
                    console.log('User sign in')
                }).catch(error => {
                    console.log(error.response)
                });

        }
        catch (err) {
            context.commit('auth/setAuthenticationError', err, { root: true })
        }
    },
    signOut: async (context) => {
        try {
            await Auth.signOut()
        } catch (err) {
            logger.error('error during sign out: {}', err)
        }
        context.commit('auth/clearAuthentication', null, { root: true })
    },
    signUp: async (context, params) => {
        context.commit('auth/clearAuthenticationStatus', null, { root: true })
        try {
            await Auth.signUp(params)
            context.commit('auth/clearAuthentication', null, { root: true })
        } catch (err) {
            context.commit('auth/setAuthenticationError', err, { root: true })
        }
    },
    confirmSignUp: async (context, params) => {
        logger.debug('confirm signup for {}', params.username)
        context.commit('auth/clearAuthenticationStatus', null, { root: true })
        try {
            await Auth.confirmSignUp(params.username, params.code)
        } catch (err) {
            context.commit('auth/setAuthenticationError', err, { root: true })
        }
    },
    confirmResend: async (context, params) => {
        context.commit('auth/clearAuthenticationStatus', null, { root: true })
        try {
            await Auth.resendSignUp(params.username)
        } catch (err) {
            context.commit('auth/setAuthenticationError', err, { root: true })
        }
    },
    passwordReset: async (context, params) => {
        context.commit('auth/clearAuthenticationStatus', null, { root: true })
        try {
            await Auth.forgotPassword(params.username)
        } catch (err) {
            context.commit('auth/setAuthenticationError', err, { root: true })
        }
    },
    confirmPasswordReset: async (context, params) => {
        context.commit('auth/clearAuthenticationStatus', null, { root: true })
        try {
            await Auth.forgotPasswordSubmit(params.username, params.code, params.password)
        } catch (err) {
            context.commit('auth/setAuthenticationError', err, { root: true })
        }
    },
    passwordResetResend: async (context, params) => {
        context.commit('auth/clearAuthenticationStatus', null, { root: true })
        try {
            await Auth.passwordResetResend(params.username)
        } catch (err) {
            context.commit('auth/setAuthenticationError', err, { root: true })
        }
    },
    passwordChange: async (context, params) => {
        logger.debug('password change for {}', context.state.user.username)
        context.commit('auth/clearAuthenticationStatus', null, { root: true })
        try {
            const user = await Auth.currentAuthenticatedUser()
            await Auth.changePassword(user, params.currentPassword, params.newPassword)
        } catch (err) {
            context.commit('auth/setAuthenticationError', err, { root: true })
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}