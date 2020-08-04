<template>
    <div>
        <b-row class="justify-content-md-center myItems">
            <b-card-group deck>
                <b-col sm="12" v-for="item in itemList" :key="item.clothingId">
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
        name: "myItems",
        data: function() {
            return {
                response: {}
            }
        },
        methods: {
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
	
	.myItems {
		overflow-x: hidden;
		overflow-y:scroll;
		height:350px
	}
</style>