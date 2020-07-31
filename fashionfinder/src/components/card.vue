<template>
	<div>
		<b-card
		img-alt="Image"
		img-top
		tag="article"
		style="max-width: 20rem;"
		class="mb-2"
		>
		<img :key="key" style="width:100%" :src="source" height="150px" width="100px"/>
		
		<b-button class="genButton" href="#" variant="primary" >{{buttonText}}</b-button>
<!--
		<b-card-text>
			
		</b-card-text>
-->
		</b-card>
	</div>

</template>

<script>

export default {
    name: 'card',
	data: function() {
		return {
			key: 0,
		}
	},
	props: {
		source: {
			required: true,
			default: ''
		},
		buttonText: {
			required: true,
			default: ''
		},
		cardText: {
			required: true,
			default: ''
		},
	},
	mounted: function() {
		this.key += 1;
	}
}


</script>



<style scoped>
	.genButton {
		margin-top: 5%;
		margin-left: 25%;
	}




</style>