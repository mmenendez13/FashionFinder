<template>
    <div>
        <b-row class="justify-content-md-center">
            <b-col sm="12" lg="8">
                <b-row>
                    <b-col v-for="(item, index) in itemList" :key="item.email" cols="3">
                        <card
                            :source="getRandom(index)"
                            :text="item.email"
                        >
                        {{item.firstName}}
                        </card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>

import axios from 'axios'
import card from '@/components/card.vue'

    export default {
        data: function() {
            return {
                itemList: [],
            }
        },
        methods: {
            getRandom: function(idx){
                return "https://picsum.photos/id/" + Math.floor(idx + 1000*Math.random()).toString() + "/200/300"
            },
            async getItemList() {
                axios.get("http://127.0.0.1:4000/whatever")
                .then(response => {
                    this.itemList = response.data.data
                }).catch(error => {
                    // console.log(error.response)
                    this.itemList = error
                });
            },   
        },
        mounted() {
            // this.getItemList()
        },
        components: {
            card
        }
    }

</script>

<style scoped>
    card {
        margin: 5px;
        padding: 5px;
    }
</style>