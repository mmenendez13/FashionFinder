<template>
    <b-navbar toggleable="md" type="dark">
        <b-navbar-brand to="/"><img src="@/assets/img/logo.png" height="42"/></b-navbar-brand>
        <b-navbar-toggle id="hamburger" target="nav_collapse"/>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-button 
                    v-if="!isAuthenticated" 
                    to="/signUp" 
                    variant="outline-light" 
                    class="navButton"
                >
                    <span class="nav-text">
                        Sign Up
                    </span>
                </b-button>
                <b-button 
                    v-if="!isAuthenticated" 
                    to="/signIn" 
                    variant="outline-light" 
                    class="navButton"
                >
                    <span class="nav-text">
                        Sign In
                    </span>
                </b-button>
                <b-nav-item-dropdown 
                    v-if="isAuthenticated" 
                    class="nav-dropdown"
                    right
                >
                    <template slot="button-content">
                        <div class="divider"/>
                        <strong class="nav-dropmenutext">{{ given_name }}</strong>
                    </template>
                    <b-row class="" style="margin:5px">
                        <b-dropdown-item 
                            v-b-toggle="'nav_collapse'" 
                            to="/changePassword"
                        >
                            <span class="nav-droptext">
                                Change Password
                            </span>
                        </b-dropdown-item>
                        <b-dropdown-item 
                            v-b-toggle="'nav_collapse'" 
                            to="/signOut"
                        >
                            <span class="nav-droptext">
                                Sign Out
                            </span>
                        </b-dropdown-item>
                    </b-row>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>        
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'navbar',
    computed: {
        ...mapState({
            user: state => state.auth.user,
            isAuthenticated: state => state.auth.isAuthenticated,
        }),
        given_name: {
            get: function() {
                return this.user.signInUserSession.idToken.payload.name
            }
        },
    },
    methods: {
        signIn() {
            this.$store.dispatch('signIn')
        }
    }
}
</script>

<style scoped>
.navbar {
    background-color: #373737;
}

#hamburger {
    background-color: #DCD0C0;
}

.nav-dropdown{
    text-align:right;
    background-color: #939393;
    border-radius: 5px;
    border: 1px red;
}

.nav-text {
    padding-left: .5em;
    padding-right: .5em;
    color: #999999;
    letter-spacing: .1em;
    transition: text-shadow .3s;
}

.nav-text:hover {
    text-shadow: 0 0 .5px #333, 0 0 .5px #333;
}

.nav-dropmenutext, #user_icon{
    color: white;
    margin: 5x;
    font-size: 1rem;
}

.nav-droptext {
    color: #999999;
    padding-right: 10px;
}



</style>
