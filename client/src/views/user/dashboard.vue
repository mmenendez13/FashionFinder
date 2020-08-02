<template>
    <div>
        <b-row class="justify-content-md-center">
            <b-col sm="12" md="8">
                <div class="mt-3">
                    <b-card-group deck>
                        <b-card bg-variant="info" text-variant="white" header="Add Item" class="text">
                            <newItem/>
                        </b-card>
                        <b-card bg-variant="danger" text-variant="white" header="Todays Outfit" class="text-center">
                            <selectedOutfit/>
                        </b-card>
                        <b-card bg-variant="warning" text-variant="white" header="My Items" class="text-center">
                            <myItems/>
                        </b-card>
                    </b-card-group>
                </div>
            </b-col>
        </b-row>
    </div>
</template>


<script>
import newItem from '@/components/cards/newItem.vue'
import selectedOutfit from '@/components/cards/selectedOutfit.vue'
import myItems from '@/components/cards/myItems.vue'

export default {
    name: "dashboard",
    data: function(){
        return {
            response: '',
        }
    },
    methods: {

    },
	components: {
        newItem,
        selectedOutfit,
        myItems
	}
}

</script>

<style scoped>

    b-col {
        width: 100%;
    }



</style>