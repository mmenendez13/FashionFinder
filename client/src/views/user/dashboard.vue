<template>
    <div>
        <b-row class="justify-content-md-center">
            <b-col sm="12" md="8">
                <div class="mt-3">
                    <b-card-group deck>
                        <b-card bg-variant="info" text-variant="white" header="Add Item" class="text-center">
                            <newItem/>
                        </b-card>
                        <b-card bg-variant="danger" text-variant="white" header="Todays Outfit" class="text-center">
                            <h2>API call to pick pants and shirt combo, or dress.</h2>
                            <hr>
                        </b-card>
                        <b-card bg-variant="warning" text-variant="white" header="My Items" class="text-center">
                        <router-link to="/myItems">
                            <h2>Click here to see your shit</h2>
                            <hr>
                        </router-link>
                        </b-card>
                    </b-card-group>
                </div>
            </b-col>
        </b-row>
    </div>
</template>


<script>
import newItem from '@/components/forms/newItem.vue'

export default {
    data: function(){
        return {
            response: '',
        }
    },
    methods: {

    },
	components: {
        newItem
	}
}

</script>

<style scoped>

    b-col {
        width: 100%;
    }



</style>