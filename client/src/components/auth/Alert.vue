<template>
    <div class="padded">
        <b-alert 
            :show="authenticationStatus.state == 'failed'"
            :variant="authenticationStatus.variant"
        >
            {{ authenticationStatus.message }}
        </b-alert>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    mounted() {
        // clear existing status message
        this.$store.dispatch("auth/clearAuthenticationStatus")
    },
    computed: {
        ...mapGetters("auth", ["authenticationStatus", "hasAuthenticationStatus"])
    },
    methods: {
        sleep: function(milliseconds) {
            let currentTime = new Date().getTime();
            while (currentTime + milliseconds >= new Date().getTime()) {
                //Do nothing
            }
        }
    }
}

</script>

<style scoped>
.padded {
    padding-top: 25px;
}
</style>