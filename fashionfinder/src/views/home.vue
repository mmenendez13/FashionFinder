<template>
    <div>
        <b-row>
            <b-col>
                  <b-button v-on:click=addOne>{{what}}</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
    name: 'home',
    data: function() {
        return {
            what: 5
        }
    },
    methods: {
        addOne: function() {
            this.what += 1;
        }
    }
}
</script>
