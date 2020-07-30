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
                                <br>
                                <p>
                                    {{response}}
                                </p>
                                <hr>
                                <hr>
                        </div>
						<b-row class="justify-content-md-center">
							<b-col>
								<card :source="require('@/assets/img/Clueless.jpg')" text="Generate Outfit">
								</card>
							</b-col>
							<b-col>
								<card :source="require('@/assets/img/Closet.jpg')" text="Add Clothes"></card>
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
			card
		}
}

</script>

<style>
	.viewOutfit{
		
	}



</style>