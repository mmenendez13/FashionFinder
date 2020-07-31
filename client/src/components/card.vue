<template>
	<div>
		<b-card
		img-alt="Image"
		img-top
		tag="article"
		style="max-width: 20rem;"
		class="mb-2"
		>
		<img :key="key" :src="source"/>
		<p>
			{{text}}
		</p>
		<p>
			<slot/>
		</p>
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
}


</script>



<style scoped>
	.genButton {
		margin-top: 5%;
		margin-left: 25%;
	}

	img {
		height: 200px;
		width: 100%;
	}


</style>