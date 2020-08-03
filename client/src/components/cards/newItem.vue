<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="item-type" label="Clothing type:" label-for="input-1" class="text-center">
                <b-form-select
                    placeholder="Select the item type"
                    id="input-1"
                    v-model="form.itemType" 
                    :options="clothingTypes"
                    required
                ></b-form-select>
            </b-form-group>

            <b-form-group id="description" label="Description:" label-for="input-3" class="text-center">
                <b-form-input
                    id="input-2"
                    v-model="form.description"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="modifiers" label="Attributes" label-for="input-4">
                <colorPicker v-model="form.color"/>
                <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" v-model="form.plaid">Plaid</b-form-checkbox>
                <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" v-model="form.stripes">Stripes</b-form-checkbox>
            </b-form-group>

            <b-form-group class="text-center">
                <b-button type="submit" variant="primary">Submit</b-button>
                <div class="divider"/>
                <b-button type="reset" variant="danger">Reset</b-button>
        </b-form-group>
        </b-form>
</div>
</template>

<script>
import colorPicker from '@/components/cards/colorPicker.vue'
import store from '@/store'
import axios from 'axios'

    export default {
        name: "newItem",
        data: function() {
            return {
                form: {
                    itemType: '',
                    description: '',
                    plaid: false,
                    stripes: false,
                    color: '000000',
                },
                clothingTypes: ['Shirt', 'Pants', 'Dress'],
                show: true
            }
        },
        computed: {
            ownerId() {
                return this.$store.state.user.userId
            },
            itemClass() {
                return this.$store.state.user.selectedClass
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault()
                this.submitForm(this.form)
            },
            async submitForm() {

                let postData = Object.assign({}, this.form);

                postData.ownerId = this.ownerId;
                postData.itemClass = this.itemClass;

                axios.post("http://127.0.0.1:4000/newItem", postData)
                .then(response => {
                    this.response = JSON.stringify(response)
                    store.dispatch('user/getItemList', {ownerId: this.ownerId, itemClass: this.itemClass})
                }).catch(error => {
                    console.log(error.response)
                });
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.selected = ''
                this.form.description = ''

                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
        },
        components: {
            colorPicker
        }
    }

</script>