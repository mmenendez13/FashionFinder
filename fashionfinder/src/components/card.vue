<template>
	<div>
		<b-card
		img-alt="Image"
		img-top
		tag="article"
		style="max-width: 20rem;"
		class="mb-2"
		>
		<img :key="key" style="width:100%" :src="source"/>
		<b-button class="genButton" href="#" variant="primary" >{{text}}</b-button>
		<b-card-text>
			Let's get dressed you lazy sack of shit
		</b-card-text>
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
		text: {
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