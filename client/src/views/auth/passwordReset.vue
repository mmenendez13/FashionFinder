<template>
    <b-container class="buffer">
        <b-row class="justify-content-md-center">
            <b-col sm="12" md="8" lg="6">
                 <h2 style="text-align:center">{{ title }}</h2>
                 <hr>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col sm="12" md="6" lg="6">
                <div v-if="pageName == 'resetPassword'" class="page">
                    <b-form @submit.prevent="next">            
                        <b-form-group
                        label="Email:"
                        label-for="emailInput">
                        <b-form-input 
                            id="emailInput"
                            type="text"
                            v-model="email"
                            required
                            autofocus
                            placeholder="Enter email"/>
                        </b-form-group>
                    
                        <b-button
                            class="nextbtn"
                            type="submit"
                        >
                            Next
                        </b-button>
                    </b-form>
                </div>
                <div v-if="pageName == 'confirmReset'">
                    <b-form @submit.prevent="confirmReset">
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="Code:"
                                    label-for="codeInput">
                                    <b-form-input 
                                        id="codeInput"
                                        type="text"
                                        v-model="code"
                                        required
                                        placeholder="Enter code"/>
                                </b-form-group>
                                <b-form-group
                                    label="Password:"
                                    label-for="passwordInput">
                                    <b-form-input 
                                        id="passwordInput"
                                        type="password"
                                        v-model="password"
                                        required
                                        placeholder="Enter password"/>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                        <div class="bottomButtons">
                            <b-button   
                                type="submit"
                                class="submitbtn"
                            >
                                Submit!
                            </b-button>
                            <div class="divider"></div>
                            <b-button
                                class="prevbtn"
                                @click="pageName = 'resetPassword'"
                            >
                                Prev
                            </b-button>
                            <div class="divider"></div>
                            <b-button 
                                variant="secondary" 
                                @click="passwordResetResend"
                            >
                                Resend Code
                            </b-button>
                        </div>
                    </b-form>
                </div>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col
                sm="10"
                md="4"
            >
                <v-alert/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Vue from "vue"
import router from "@/router"
import { mapGetters } from "vuex"
import { mapActions } from "vuex"
import store from "@/store"
import Alert from "@/components/auth/Alert.vue"

Vue.component("v-alert", Alert)

export default {
    data() {
        return {
            pageName: 'resetPassword',
            title: 'Reset Your Password',
            phone: "",
            password: "",
            code: "",
            validation: {
                phone: {
                    show: false,
                    message: "Your phone appears to be invalid."
                }
            }
        }
    },
    mounted() {
        // clear existing status message
        store.dispatch("auth/clearAuthenticationStatus")

    },
    computed: {
        ...mapGetters("auth", ["hasAuthenticationStatus", "authenticationStatus", "isAuthenticated"]),
        phoneNumber: {
            get: function() {
                if(this.phone != ''){
                    return '+1'+this.phone.match(/\d+/g).map(Number).join('')
                } else {
                    return ''
                }
            }
        }
    },
    methods: {
        ...mapActions({
            updatePhone: 'userVar/setPhoneNumber',
            setComplete: 'userVar/setProfileCompleted'
        }),
        prev: function() {
            this.pageName = 'resetPassword'
            this.title = 'Reset Your Password'
        },
        async next() {
            this.pageName = 'confirmReset'
            this.title = 'Confirm Reset'
            await store.dispatch("auth/passwordReset", {
                username: this.email
            })
        },
        async confirmPasswordReset() {
            await store.dispatch("auth/confirmPasswordReset", {
                username: this.email,
                code: this.code,
                password: this.password,
            })
            if (this.hasAuthenticationStatus) {
                router.push("signIn")
            }
        },
        async passwordResetResend() {
            await store.dispatch("auth/passwordReset", {
                username: this.phoneNumber
            })
        }
    }
}
</script>

<style scoped>
.bottomButtons{
    margin-top: 50px
}


</style>