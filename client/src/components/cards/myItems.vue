<template>
    <div>
        <b-row class="justify-content-md-center">
            <b-card-group deck>
                <b-col sm="12" lg="6" v-for="item in itemList" :key="item.clothingId">
                    <b-card style="color:black">
                        <b-card-text>{{item.description}}</b-card-text>
                    </b-card>
                </b-col>
            </b-card-group>
        </b-row>
    </div>
</template>

<script>
import store from '@/store'

    export default {
        data: function() {
            return {
                response: {}
            }
        },
        methods: {
            getRandom: function(idx){
                return "https://picsum.photos/id/" + Math.floor(idx + 1000*Math.random()).toString() + "/200/300"
            }, 
            refreshItemList: function() {
                store.dispatch('user/getItemList', {userId: this.userId, itemClass: this.itemClass})
            }
        },
        computed: {
            itemList() {
                return store.state.user.itemList
            },
            itemClass() {
                return store.state.user.selectedClass
            },
            userId() {
                return store.state.user.userId
            }
        },
        mounted() {
            this.refreshItemList()
        },
        components: {

        }
    }

</script>

<style scoped>
    card {
        margin: 5px;
        padding: 5px;
    }
</style>