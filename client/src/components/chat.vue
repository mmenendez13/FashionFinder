<template>
    <div class="card mt-3">
        <div class="card-body">
            <div class="card-title">
                <h3>Chat Group</h3>
                <hr>
            </div>
            <div class="card-body">
                <div class="messages" v-for="(msg, index) in messages" :key="index">
                    <p><span class="font-weight-bold">{{ msg.name }}: </span>{{ msg.message }}</p>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <form @submit.prevent="sendMessage">
                <div class="gorm-group">
                    <label for="user">User:</label>
                    <input type="text" v-model="user" class="form-control">
                </div>
                <div class="gorm-group pb-3">
                    <label for="message">Message:</label>
                    <input type="text" v-model="message" class="form-control">
                </div>
                <button type="submit" class="btn btn-success">Send</button>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    data: function() {
        return {
            user: '',
            message: '',
            messages: [],
        }
    },
    computed: {
        socketMessage: {
            get: function(){
                
            }
        },

    },
    methods: {
        parse: function(data,event){
        },
        sendMessage: function(val) {
            this.$socket.send(JSON.stringify({name: this.user, message: this.message}))
        }
    },
    mounted() {
        this.$options.sockets.onmessage = (data) => {
            console.log(data)
            this.messages.push(JSON.parse(data.data))
        }
    }
}
</script>