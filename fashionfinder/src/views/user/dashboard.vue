<template>
<div>
        <b-row class="justify-content-md-center">
                <b-col
                        sm="12"
                        md="8"
                >
                        <div>
                                <h1>Dashboard</h1>
                                <b-button v-on:click="postData">Post request test</b-button>
                                <hr>
                        </div>
						<b-row class="justify-content-md-center">
							<b-col lg='3'>
								<card :source="require('@/assets/img/Clueless.jpg')" buttonText="Generate Outfit">
								</card>
							</b-col>
							<b-col lg='auto'>
								<outfitDisplay></outfitDisplay>
							</b-col>
							<b-col lg='3'>
								<card :source="require('@/assets/img/Closet.jpg')" buttonText="Add Clothes"></card>
							</b-col>
						</b-row>
                </b-col>
        </b-row>
</div>
</template>

<script>
import axios from 'axios'
import card from '@/components/card.vue'
import outfitDisplay from '@/components/outfitDisplay.vue'

export default {
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
			outfitDisplay
		}
}

</script>

<style>
	.viewOutfit{
		
	}



</style>