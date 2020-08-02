<template>
	<div>
		<b-form-group id="item-class" label="Clothing classification:" label-for="input-2" class="text-center">
			<b-form-select
			placeholder="Classification"
			id="input-1"
			v-model="classType" 
			:options="classTypes"
			required
			></b-form-select>
		</b-form-group>
	</div>
</template>

<script>

	export default {
		name: 'selectedOutfit',
		data: function() {
			return {
				classType: '',
				classTypes: ['Business', 'Casual']
			}
		}
	}

</script>