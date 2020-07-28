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
                </b-col>
        </b-row>
</div>
</template>

<script>
import axios from 'axios'

export default {
        data: function(){
                return {
                        response: '',
                }
        },
        methods: {
                async postData() { 
                    axios.post("http://192.168.1.14:80/body",{'Thisisalsoatest':'Test'})
                    .then(response => {
                            this.response = JSON.stringify(response)
                    }).catch(error => {
                            console.log(error.response)
                    });
                },        
        }
}

</script>