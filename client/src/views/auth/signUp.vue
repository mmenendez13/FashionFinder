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
                <div v-if="pageName == 'signUp'" class="page">
                    <b-form @submit.prevent="sendValidation">
                        <b-form-group
                            label="Full Name:"
                            label-for="nameInput">
                            <b-form-input 
                                id="nameInput"
                                type="text"
                                v-model="name"
                                required
                                placeholder="First name"/>
                        </b-form-group>

                        <b-form-group
                            label="email"
                            label-for="emailInput">
                            <b-form-input 
                                id="emailInput"
                                type="text"
                                v-model="email"
                                required
                                placeholder="Email Address"
                            />
                                <b-alert
                                    v-if="!verifyEmail && showAlerts"
                                    variant="danger"
                                    show
                                >
                                    The provided email appears to be invalid.
                                </b-alert>
                        </b-form-group>

                        <b-form-group
                            label="Create password"
                            label-for="passwordInput">
                            <b-form-input 
                                id="passwordInput"
                                type="password"
                                v-model="pass"
                                required
                                placeholder="Enter password"
                            />
                                <b-alert 
                                    v-if="!verifyPassword && showAlerts" 
                                    variant="danger"
                                    show
                                >
                                </b-alert>
                        </b-form-group>

                        <b-button
                            class="nextbtn"
                            type="submit"
                        >
                            Next
                        </b-button>
                    </b-form>
                </div>
                <div v-if="pageName == 'confirmSignUp'">
                    <b-form @submit.prevent="confirmSignUp">
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    label="Check your phone for the verification code:"
                                    label-for="codeInput">
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                        <b-form-row>
                            <b-col lg="9" md="9" sm="12">
                                <b-form-input 
                                    id="codeInput"
                                    type="text"
                                    v-model="code"
                                    required
                                    placeholder="Enter Code"/>
                            </b-col>
                            <b-col>
                                 <b-button 
                                    class="resendBtn"
                                    variant="secondary" 
                                    @click="sendValidation"
                                >
                                    Resend
                                </b-button>
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
                                @click="pageName = 'signUp'"
                            >
                                Prev
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
                <div 
                    v-if="loading"
                    class="loader"
                ></div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import router from "@/router"
import { mapGetters } from "vuex"
import store from "@/store"


export default {
    data() {
        return {
            pageName: 'signUp',
            title: "Welcome",
            email: "",
            name: "",
            pass: "",
            code: "",
            showAlerts: false,
            loading: false,
        }
    },
    mounted() {
        // clear existing status message
        store.dispatch("auth/clearAuthenticationStatus")
    },
    computed: {
        ...mapGetters("auth", ["hasAuthenticationStatus", "authenticationStatus", "isAuthenticated"]),
        verifyEmail: {
            get: function(){
                // let email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                // return email_regex.test(this.email)
                return this.email
            }
        },
        verifyPassword: {
            get: function(){
                let password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,99}$/
                return password_regex.test(this.pass)
            }
        }
    },
    methods: {
        prev: function() {
            this.pageName = 'signUp'
            this.title = 'Welcome to the Room'
        },
        async sendValidation() {
            this.showAlerts = false
            if(this.verifyEmail && this.verifyPassword){
                
                store.dispatch("auth/signUp", {
                    username: this.email,
                    password: this.pass,
                    attributes: {
                        email: this.email,
                        name: this.name
                    }
                })            

                this.pageName = 'confirmSignUp'
                this.title = "Verify Your Account"
            } else {
                this.showAlerts = true
            }
        },
        async confirmSignUp() {
            this.loading = true
            let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
            if(typeof timezone == 'undefined'){
                timezone = "America/New_York"
            }
            await store.dispatch("auth/confirmSignUp", {
                username: this.email,
                code: this.code
            })
            if(this.authenticationStatus != null){
                this.signIn()
            } else {
                this.signIn()
            }
        },
        async signIn() {
            await store.dispatch("auth/signIn", {
                username: this.email,
                password: this.pass
            })
            // console.log(await this.isAuthenticated)
            if (await this.isAuthenticated) {
                router.push("dashboard")
            } else {
                router.push('signIn')
            }
        },
    }
}
</script>

<style scoped>
.bottomButtons{
    margin-top: 50px
}

.submitbtn{
    margin-right:10px
}

b-alert{
    margin-top: 5px;
}

.resendBtn{

}
</style>