<template>
    <div id="app">
        <b-container 
        class="all" 
        fluid>
            <div>
                <navbar/>
                <div class="main card">
                    <router-view/>
                </div>
            </div>
    </b-container>
</div>
</template>

<script>
//import Vue from 'vue'

import navbar from './components/navbar.vue'

export default {
    name: 'App',
    components: {
        navbar
    }
}
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import '~bootstrap-vue/dist/bootstrap-vue.css';


#app {
    font-family: 'Helvetica', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    text-decoration: none;
    background-color: black;
}

#app a:hover{
    text-decoration: none;
}

.all{
    margin: 0;
    padding: 0;
    
    min-height: 100vh;
}

.divider{
    width:5px;
    height:auto;
    display:inline-block;
}

.main{
    background-color: white;
    min-height: 85vh;
    margin: 10px;
    padding: 15px;
    padding-top: 20px;
}

.loader {
    margin: 0 auto;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 150px;
    height: 150px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #C0B283;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
