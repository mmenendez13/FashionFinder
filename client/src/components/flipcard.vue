<template>
	<div class="flipcard" v-on:click="flip">
		<div class="front">
			<slot name="front"></slot>
	    </div>
	    <div class="back">
			<slot name="back"></slot>
	    </div>
	</div>
</template>

<script>
export default {
	methods: {
		flip: function(event){
			var element = event.currentTarget;
			if (element.className === "flipcard") {
		    	if(element.style.transform == "rotateY(180deg)") {
		      		element.style.transform = "rotateY(0deg)";
		    	} else {
		      		element.style.transform = "rotateY(180deg)";
		    	}
		  	}
		}
	}
}
</script>

<style>

.container {
  margin: 20px;
  width: 500px;
  height: 500px;
  perspective: 1000px;
}

.flipcard {
  transition: transform 2s;
  transform-style: preserve-3d;
  cursor: pointer;
}

</style>