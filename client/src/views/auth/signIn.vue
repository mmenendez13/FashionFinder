<template>
    <b-container>
        <b-row class="justify-content-md-center">
            <b-col sm="12" md="10" lg="8">
                <div class="b-form-1">
                    <h2>Sign In</h2>
                    <b-form @submit.prevent="signIn">
                        <b-form-group
                            label="Email:"
                            label-for="emailInput">
                            <b-form-input 
                                id="emailInput"
                                type="text"
                                v-model="email"
                                required
                                placeholder="Enter email"/>
                        </b-form-group>
                        <b-form-group
                            label="Password:"
                            label-for="passwordInput">
                            <b-form-input 
                                id="passwordInput"
                                type="password"
                                v-model="pass"
                                required
                                placeholder="Enter password"/>
                        </b-form-group>
                        <b-button 
                            type="submit" 
                            class="submitbtn">Submit</b-button>
                    </b-form>
                </div>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col sm="10" md="8">
                <p>
                    <b-link to="signUp">Create an account</b-link> or <b-link to="passwordReset">reset password</b-link>
                </p>
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
import { mapGetters } from "vuex"
import router from "@/router"
import store from "@/store"
import Alert from "@/components/auth/Alert.vue"

Vue.component("v-alert", Alert)

export default {
    data() {
        return {
            email: "",
            pass: ""
        }
    },
    computed: {
        ...mapGetters("auth", ["hasAuthenticationStatus", "isAuthenticated"]),
    },
    methods: {
        async signIn() {
            await store.dispatch("auth/signIn", {
                username: this.email,
                password: this.pass
            })
            router.push("dashboard")
        },
    }
}
</script>

<style scoped>
</style>
