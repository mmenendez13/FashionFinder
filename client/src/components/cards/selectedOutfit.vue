<template>
    <div>
        {{myOutfit}}
        <b-row class="justify-content-md-center" style="position:relative; overflow-y:scroll">
            <b-card-group deck>
                    <b-card style="color:black">
                        <b-card-text>{{myOutfit.shirt}}</b-card-text>
                    </b-card>
                    <b-card style="color:black">
                        <b-card-text>{{myOutfit.pants}}</b-card-text>
                    </b-card>
            </b-card-group>
        </b-row>
    </div>
</template>

<script>
import store from '@/store'
import axios from 'axios'

    export default {
        name: "selectedOutfit",
        data: function() {
            return {
                myOutfit: {}
            }
        },
        methods: {
            getOutfit: function() {
                axios.post("http://127.0.0.1:4000/getOutfit", {userId: this.userId, itemClass: this.itemClass})
                .then(response => {
                    this.myOutfit = response.data.data
                }).catch(error => {
                    // console.log(error.response)
                    this.myOutfit = error
                });
                    }
        },
        computed: {
            itemClass() {
                return store.state.user.selectedClass
            },
            userId() {
                return store.state.user.userId
            }
        },
        mounted() {
            this.getOutfit()
        },
        components: {

        }
    }

</script>