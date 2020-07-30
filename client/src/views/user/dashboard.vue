<template>
<div>
        <b-row class="justify-content-md-center">
                <b-col
                        sm="12"
                        md="8"
                >
                        <div>
                                <h1>Dashboard</h1>
                                <br>
                                <hr>
                                <newItem/>
                        </div>
                </b-col>
        </b-row>
</div>
</template>

<script>
import axios from 'axios'
import card from '@/components/card.vue'
import newItem from '@/components/forms/newItem.vue'

export default {
    data: function(){
        return {
            response: '',
        }
    },
    methods: {
        async postData() { 
            axios.post("http://google.com/",{'Thisisalsoatest':'Test'})
            .then(response => {
                this.response = JSON.stringify(response)
            }).catch(error => {
                console.log(error.response)
            });
        },   
    },
	components: {
		card,
        newItem
	}
}

</script>

<style>
	.viewOutfit{
		
	}



</style>