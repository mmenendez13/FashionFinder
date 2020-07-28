<template>
    <div :key="key">
        <h1>Data Streams</h1>
        {{dataStream}}
        <hr/>
        <b-row class="justify-content-md-center" v-if="connected" :key="key">
                <b-col v-for="(stream,address) in dataStream" sm="12" md="4" lg="3">
                    <div class="boxshadow">
                        <h2>{{stream.name}}</h2>
                        <hr>
                        <p><span style="font-weight:bold">Value:</span> {{stream.message}} </p>
                        <p><span style="font-weight:bold">IP:</span> {{address}}</p>
                    </div>
                    <button v-on:click="key++">Button</button>
                </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data: function() {
        return {
            dataStream: this.$store.state.streams,
            key: 0
        }
    },
    computed: {
        connected: {
            get: function(){
                return this.$store.state.socket.isConnected
            }
        }
    }
}

</script>

<style scoped>
.deviceCard{
    text-align:center;
    margin:10px;
    padding:10px;
    border: black solid 1px;
    height: 500px;
}

.boxshadow {
    position: relative;
    -moz-box-shadow: 1px 2px 4px rgba(0, 0, 0,0.5);
    -webkit-box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    padding: 20px;
    background: white;
}

h2 {
    text-align: center;
    font-weight: bold;
    font-size: 2em;
}
</style>