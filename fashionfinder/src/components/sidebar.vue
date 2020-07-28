<template>
<div>
  	<b-nav vertical class="sidebar" v-if="isAuthenticated">
    	<b-list-group v-if="connected" :key="connected">
    		<b-list-group-item variant="dark">Connections:</b-list-group-item>
    		<b-list-group-item 
    			class="d-flex justify-content-between align-items-center"
    		>
    			- This device
    		</b-list-group-item>
			<b-list-group-item 
				class="d-flex justify-content-between align-items-center" 
				v-for="(client,ip) in clients"
			>
		    	- {{ip}}
		    	<b-badge 
		    		style="max-width:50px" 
		    		variant="primary" 
		    		v-if="!isNaN(client.values[client.values.length-1])" 
		    		pill
		    	>
		    		{{getVal(client)}}
		    	</b-badge>
		  	</b-list-group-item>
		</b-list-group>
  	</b-nav>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data: function(){
		return {
			clients: this.$store.state.streams,
		}
	},
	computed: {
		...mapState({
            user: state => state.auth.user,
            isAuthenticated: state => state.auth.isAuthenticated,
        }),
		connected: {
			get: function(){
				return this.$store.state.socket.isConnected
			}
		}
	},
	methods: {
		getVal: function(client){
			return client.values[client.values.length-1]
		}
	}
}
</script>

<style scoped>

.sidebar {
  margin: 0;
  padding: 0;
  width: 220px;
  background-color: #f1f1f1;
  position: absolute;
  height: 100%;
  overflow: auto;
}

.sidebar .block {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
  font-weight: 500;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 1120px) {
  .sidebar {
  	display: none;
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

</style>